import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
    ValidationMessagesConstants
} from '../../../../../contexts/shared/domain/constants/ValidationMessagesConstants';

export class SearchAllClientsGetControllerRequest {
  @ApiProperty({ required: true, default: 1 })
  @IsNotEmpty({ message: ValidationMessagesConstants.PAGINATION_PARAM_REQUIRED })
      page: number;

  @ApiProperty({ required: true, default: 15 })
  @IsNotEmpty({ message: ValidationMessagesConstants.PAGINATION_PARAM_REQUIRED })
      limit: number;
}