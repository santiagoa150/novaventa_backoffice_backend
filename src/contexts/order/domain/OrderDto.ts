import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsIn, IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';
import { ValidationMessagesConstants } from '../../shared/domain/constants/ValidationMessagesConstants';
import { OrderStatusConstants } from './OrderStatusConstants';

export class OrderDto {
  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.ORDER_ID_REQUIRED })
  @IsString({ message: ValidationMessagesConstants.ORDER_ID_MUST_BE_STRING })
  @IsUUID(4, { message: ValidationMessagesConstants.INVALID_ORDER_ID_FORMAT })
      orderId: string;

  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.USER_ID_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.USER_ID_REQUIRED })
  @IsUUID(4, { message: ValidationMessagesConstants.INVALID_USER_ID_FORMAT })
      userId: string;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.ORDER_YEAR_REQUIRED })
  @IsNumber({ allowNaN: false }, { message: ValidationMessagesConstants.ORDER_YEAR_MUST_BE_NUMBER })
  @Min(0, { message: ValidationMessagesConstants.ORDER_YEAR_MUST_BE_GREATER_THAN_ZERO })
  @Max(9999, { message: ValidationMessagesConstants.ORDER_YEAR_MUST_BE_LOWER_THAN_9999 })
      year: number;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.ORDER_STATUS_REQUIRED })
  @IsString({ message: ValidationMessagesConstants.ORDER_STATUS_MUST_BE_STRING })
  @IsIn(Object.values(OrderStatusConstants), { message: ValidationMessagesConstants.INVALID_ORDER_STATUS })
      status: string;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.ORDER_TOTAL_PRODUCTS_REQUIRED })
  @IsNumber({ allowNaN: false }, { message: ValidationMessagesConstants.ORDER_TOTAL_PRODUCTS_MUST_BE_NUMBER })
      totalProducts: number;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.ORDER_DATE_REQUIRED })
  @IsDate({ message: ValidationMessagesConstants.ORDER_DATE_MUST_BE_DATE })
      createdAt: Date;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.ORDER_CAMPAIGN_REQUIRED })
  @IsNumber({ allowNaN: false }, { message: ValidationMessagesConstants.ORDER_CAMPAIGN_MUST_BE_NUMBER })
      campaign: number;
}