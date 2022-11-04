import { HttpResponse } from '../../../../shared/config/HttpResponse';
import { ApiProperty } from '@nestjs/swagger';
import { OrderDto } from '../../../../../contexts/order/domain/OrderDto';

export class SearchAllOrdersGetControllerResponse extends HttpResponse{
  @ApiProperty({type: [OrderDto]})
      data: Array<OrderDto>;
}