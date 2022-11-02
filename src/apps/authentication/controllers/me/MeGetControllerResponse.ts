import { HttpResponse } from '../../../shared/config/HttpResponse';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../../../contexts/user/domain/UserDto';

export class MeGetControllerResponse extends HttpResponse {
  @ApiProperty()
      data: Omit<UserDto, 'password'>;
}