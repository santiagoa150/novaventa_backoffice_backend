import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ValidationMessagesConstants } from '../../../../contexts/shared/domain/constants/ValidationMessagesConstants';

export class CreateOrderPostControllerRequest {
  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.ORDER_YEAR_REQUIRED })
  @IsNumber({ allowNaN: false }, { message: ValidationMessagesConstants.ORDER_YEAR_MUST_BE_NUMBER })
  @Min(0, { message: ValidationMessagesConstants.ORDER_YEAR_MUST_BE_GREATER_THAN_ZERO })
  @Max(9999, { message: ValidationMessagesConstants.ORDER_YEAR_MUST_BE_LOWER_THAN_9999 })
      year: number;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.ORDER_CAMPAIGN_REQUIRED })
  @IsNumber({ allowNaN: false }, { message: ValidationMessagesConstants.ORDER_CAMPAIGN_MUST_BE_NUMBER })
      campaign: number;
}