import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ValidationMessagesConstants } from '../../../../contexts/shared/domain/constants/ValidationMessagesConstants';

export class LoginPostControllerRequest {
  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.USER_EMAIL_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.USER_EMAIL_REQUIRED })
      email: string;

  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.USER_PASSWORD_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.USER_PASSWORD_REQUIRED })
      password: string;
}