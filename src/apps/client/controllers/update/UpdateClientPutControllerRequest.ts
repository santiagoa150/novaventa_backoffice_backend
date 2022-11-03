import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ValidationMessagesConstants } from '../../../../contexts/shared/domain/constants/ValidationMessagesConstants';

export class UpdateClientPutControllerRequest {
  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.CLIENT_ID_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.CLIENT_ID_REQUIRED })
  @IsUUID(4, { message: ValidationMessagesConstants.INVALID_CLIENT_ID_FORMAT })
      clientId: string;

  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.CLIENT_NAME_MUST_BE_STRING })
  @IsOptional()
      name: string;

  @ApiProperty()
  @IsNumber({ allowNaN: false }, { message: ValidationMessagesConstants.CLIENT_PHONE_MUST_BE_NUMBER })
  @IsOptional()
      phone: number;

  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.CLIENT_DESCRIPTION_MUST_BE_STRING })
  @IsOptional()
      description: string;
}