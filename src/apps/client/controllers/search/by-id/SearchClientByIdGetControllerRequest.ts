import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import {
    ValidationMessagesConstants
} from '../../../../../contexts/shared/domain/constants/ValidationMessagesConstants';

export class SearchClientByIdGetControllerRequest{
  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.CLIENT_ID_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.CLIENT_ID_REQUIRED })
  @IsUUID(4, { message: ValidationMessagesConstants.INVALID_CLIENT_ID_FORMAT })
      clientId: string;
}