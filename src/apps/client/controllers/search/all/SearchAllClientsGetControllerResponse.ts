import { HttpResponse } from '../../../../shared/config/HttpResponse';
import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from '../../../../../contexts/client/domain/ClientDto';
import { PaginationResponse } from '../../../../../contexts/shared/domain/PaginationResponse';

export class SearchAllClientsGetControllerResponse extends HttpResponse{
  
  @ApiProperty()
      data: PaginationResponse<ClientDto>;
}