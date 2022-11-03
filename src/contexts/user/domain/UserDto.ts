import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ValidationMessagesConstants } from '../../shared/domain/constants/ValidationMessagesConstants';

export class UserDto {
  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.USER_ID_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.USER_ID_REQUIRED })
  @IsUUID(4, { message: ValidationMessagesConstants.INVALID_USER_ID_FORMAT })
      userId: string;

  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.USER_NAME_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.USER_NAME_REQUIRED })
      name: string;

  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.USER_EMAIL_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.USER_EMAIL_REQUIRED })
      email: string;

  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.USER_PASSWORD_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.USER_PASSWORD_REQUIRED })
      password: string;

  @ApiProperty()
  @IsBoolean({ message: ValidationMessagesConstants.USER_ACTIVE_MUST_BE_BOOLEAN })
  @IsNotEmpty({ message: ValidationMessagesConstants.USER_ACTIVE_REQUIRED })
      active: boolean;
}