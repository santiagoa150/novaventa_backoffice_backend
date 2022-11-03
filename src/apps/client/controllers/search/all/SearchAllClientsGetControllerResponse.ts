import { HttpResponse } from '../../../../shared/config/HttpResponse';
import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from '../../../../../contexts/client/domain/ClientDto';

export class SearchAllClientsGetControllerResponse extends HttpResponse{
  
  @ApiProperty({type: [ClientDto]})
      data: Array<ClientDto>;
}