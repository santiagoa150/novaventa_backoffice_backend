import { HttpResponse } from '../../../../shared/config/HttpResponse';
import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from '../../../../../contexts/client/domain/ClientDto';

export class SearchClientByIdGetControllerResponse extends HttpResponse{
  
  @ApiProperty()
      data: ClientDto;
}