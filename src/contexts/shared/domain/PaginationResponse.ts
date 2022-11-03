import {ApiProperty} from '@nestjs/swagger';

export class PaginationResponse<T> {
    @ApiProperty()
        data: Array<T>;
    @ApiProperty()
        metadata: {
        page: number,
        total: number,
        totalPages: number,
    };
}
