import { Logger } from '@nestjs/common';
import { SearchFilterObject } from '../../domain/value-object/SearchFilterObject';
import { PaginationParamObject } from '../../domain/value-object/PaginationParamObject';
import { EqSearchFilter } from '../../domain/value-object/EqSearchFilter';

export class MongoDbUtils {

    static readonly logger = new Logger(MongoDbUtils.name);

    static buildPaginatedQuery(filters?: Array<SearchFilterObject>, pageParam?: PaginationParamObject, limitParam?: PaginationParamObject): Array<any> {
        const query: any = MongoDbUtils.resolveFilters(filters);
        const data = new Array<any>();
        const aggregateOptions: any = new Array<any>();
        const metadata = new Array<any>();

        if (pageParam && limitParam) {
            const page = Number(pageParam.toString());
            const limit = Number(limitParam.toString());
            const skip: number = (page - 1) * limit;
            data.push({ $skip: skip });
            data.push({ $limit: limit });
        }

        metadata.push({ $count: 'total' });
        metadata.push({ $addFields: { page: pageParam ? Number(pageParam.toString()) : 1 } });
        metadata.push({ $addFields: { totalPages: limitParam ? { $ceil: { $divide: ['$total', Number(limitParam.toString())] } } : 1 } });
        aggregateOptions.push({ $match: query });
        aggregateOptions.push({ $sort: { createdAt: -1 } });
        aggregateOptions.push({ $facet: { data, metadata } });
        aggregateOptions.push({ $unwind: { path: '$metadata' } });
        return aggregateOptions;
    }

    static resolveFilters(filters?: Array<SearchFilterObject>): any {
        const query: any = {};
        if (filters) {
            for (const filter of filters) {
                if (filter instanceof EqSearchFilter) {
                    const dto = filter.toPrimitives();
                    query[dto.searchParam] = dto.searchValue;
                }
            }
        }
        return query;
    }

}
