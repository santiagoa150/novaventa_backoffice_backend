import { IdValueObject } from '../../shared/domain/value-object/IdValueObject';
import {v4 as uuid} from 'uuid';

export class ProductId extends IdValueObject{
  
    public static generate(): ProductId {
        return new ProductId(uuid());
    }
}