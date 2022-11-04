import { IdValueObject } from '../../shared/domain/value-object/IdValueObject';
import {v4 as uuid} from 'uuid';

export class OrderId extends IdValueObject{

    public static generate(): OrderId {
        return new OrderId(uuid());
    }
}