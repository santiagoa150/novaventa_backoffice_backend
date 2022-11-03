import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ValidationMessagesConstants } from '../../shared/domain/constants/ValidationMessagesConstants';

export class ClientDto {
  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.CLIENT_ID_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.CLIENT_ID_REQUIRED })
  @IsUUID(4, { message: ValidationMessagesConstants.INVALID_CLIENT_ID_FORMAT })
      clientId: string;

  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.USER_ID_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.USER_ID_REQUIRED })
  @IsUUID(4, { message: ValidationMessagesConstants.INVALID_USER_ID_FORMAT })
      userId: string;
  
  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.CLIENT_NAME_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.CLIENT_NAME_REQUIRED })
      name: string;

  @ApiProperty()
  @IsNumber({ allowNaN: false }, { message: ValidationMessagesConstants.CLIENT_PHONE_MUST_BE_NUMBER })
  @IsNotEmpty({ message: ValidationMessagesConstants.CLIENT_PHONE_REQUIRED })
      phone: number;

  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.CLIENT_DESCRIPTION_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.CLIENT_DESCRIPTION_REQUIRED })
      description: string;
}