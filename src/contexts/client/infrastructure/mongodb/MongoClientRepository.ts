import { IClientRepository } from '../../domain/IClientRepository';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { Model } from 'mongoose';
import { ClientDocument } from './ClientDocument';
import { ClientDto } from '../../domain/ClientDto';
import { Client } from '../../domain/Client';
import { SearchFilterObject } from '../../../shared/domain/value-object/SearchFilterObject';
import { PaginationParamObject } from '../../../shared/domain/value-object/PaginationParamObject';
import { MongoDbUtils } from '../../../shared/infrastructure/mongodb/MongoDbUtils';
import { PaginationResponse } from '../../../shared/domain/PaginationResponse';
import { UserId } from '../../../user/domain/UserId';
import { ClientId } from '../../domain/ClientId';

export class MongoClientRepository implements IClientRepository {

    private readonly logger: Logger = new Logger(MongoClientRepository.name);

    constructor(
    @InjectModel(MongoDbConstantsProvider.CLIENT_SCHEMA) private clientModel: Model<ClientDocument>
    ) {
    }

    async search(filters?: Array<SearchFilterObject>, page?: PaginationParamObject, limit?: PaginationParamObject): Promise<PaginationResponse<Client>> {
        this.logger.log(`[${this.search.name}] INIT ::`);
        const result = new PaginationResponse<Client>();
        const query = MongoDbUtils.buildPaginatedQuery(filters, page, limit);
        this.logger.log(`[${this.search.name}] query: ${JSON.stringify(query, null, 2)}`);
        const aggregateResponse: any = await this.clientModel.aggregate(query);
        console.log(aggregateResponse);
        const clientsFound = aggregateResponse && aggregateResponse.length > 0 ? aggregateResponse[0] : [];
        console.log(clientsFound);
        result.data = clientsFound && clientsFound.data ? clientsFound.data.map(c => Client.fromPrimitives(c)) : [];
        result.metadata = clientsFound && clientsFound.metadata ? clientsFound.metadata : { page: 0, total: 0, totalPages: 0};
        this.logger.log(`[${this.search.name}] FINISH ::`);
        return result;
    }

    async searchById(userId: UserId, clientId: ClientId): Promise<Client> {
        this.logger.log(`[${this.searchById.name}] INIT :: userId: ${userId.toString()}, clientId: ${clientId.toString()}`);
        const clientFound = await this.clientModel.findOne({userId: userId.toString(), clientId: clientId.toString()});
        const clientMapped =clientFound ? Client.fromPrimitives(clientFound) : null;
        this.logger.log(`[${this.searchById.name}] FINISH ::`);
        return clientMapped;
    }

    async create(client: ClientDto): Promise<Client> {
        this.logger.log(`[${this.create.name}] INIT :: client: ${JSON.stringify(client, null, 2)}`);
        const model = new this.clientModel(client);
        await model.save();
        const clientMapped = model ? Client.fromPrimitives(model) : null;
        this.logger.log(`[${this.create.name}] FINISH ::`);
        return clientMapped;
    }
}