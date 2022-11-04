import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { ValidationMessagesConstants } from '../../../../contexts/shared/domain/constants/ValidationMessagesConstants';

export class CreateProductPostControllerRequest {
  @ApiProperty()
  @IsString({ message: ValidationMessagesConstants.CLIENT_ID_MUST_BE_STRING })
  @IsNotEmpty({ message: ValidationMessagesConstants.CLIENT_ID_REQUIRED })
  @IsUUID(4, { message: ValidationMessagesConstants.INVALID_CLIENT_ID_FORMAT })
      clientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.ORDER_ID_REQUIRED })
  @IsString({ message: ValidationMessagesConstants.ORDER_ID_MUST_BE_STRING })
  @IsUUID(4, { message: ValidationMessagesConstants.INVALID_ORDER_ID_FORMAT })
      orderId: string;


  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.PRODUCT_NAME_REQUIRED })
  @IsString({ message: ValidationMessagesConstants.PRODUCT_NAME_MUST_BE_STRING })
      name: string;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.PRODUCT_CATALOG_PRICE_REQUIRED })
  @IsNumber({ allowNaN: false }, { message: ValidationMessagesConstants.PRODUCT_CATALOG_PRICE_MUST_BE_NUMBER })
  @Min(0, { message: ValidationMessagesConstants.PRODUCT_CATALOG_PRICE_MUST_BE_GRATER_THAN_ZERO })
      catalogPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.PRODUCT_LIST_PRICE_REQUIRED })
  @IsNumber({ allowNaN: false }, { message: ValidationMessagesConstants.PRODUCT_LIST_PRICE_MUST_BE_NUMBER })
  @Min(0, { message: ValidationMessagesConstants.PRODUCT_LIST_PRICE_MUST_BE_GRATER_THAN_ZERO })
      listPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.PRODUCT_QUANTITY_REQUIRED })
  @IsNumber({ allowNaN: false }, { message: ValidationMessagesConstants.PRODUCT_QUANTITY_MUST_BE_NUMBER })
  @Min(1, { message: ValidationMessagesConstants.PRODUCT_QUANTITY_PRICE_MUST_BE_GRATER_THAN_ONE })
      quantity: number;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.PRODUCT_CODE_REQUIRED })
  @IsString({ message: ValidationMessagesConstants.PRODUCT_CODE_MUST_BE_STRING })
      code: string;

  @ApiProperty()
  @IsNotEmpty({ message: ValidationMessagesConstants.PRODUCT_IMAGE_URL_REQUIRED })
  @IsString({ message: ValidationMessagesConstants.PRODUCT_IMAGE_URL_MUST_BE_STRING })
      imageUrl: string;
}