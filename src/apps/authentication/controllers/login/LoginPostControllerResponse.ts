import { HttpResponse } from '../../../shared/config/HttpResponse';
import { ApiProperty } from '@nestjs/swagger';
import { LoginAppResponse } from '../../../../contexts/authentication/application/login/LoginAppResponse';

export class LoginPostControllerResponse extends HttpResponse {
  @ApiProperty()
      data: LoginAppResponse;
}