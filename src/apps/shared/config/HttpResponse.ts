import { ApiProperty } from '@nestjs/swagger';

export class HttpResponse{
  @ApiProperty()
      success = true;
}