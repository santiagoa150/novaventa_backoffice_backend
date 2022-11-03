import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ValidationMessagesConstants } from '../../../../contexts/shared/domain/constants/ValidationMessagesConstants';

export class CreateClientPostControllerRequest {
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