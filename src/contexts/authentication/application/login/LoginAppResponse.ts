import { ApiProperty } from '@nestjs/swagger';

export class LoginAppResponse {
  @ApiProperty()
      accessToken: string;
}
