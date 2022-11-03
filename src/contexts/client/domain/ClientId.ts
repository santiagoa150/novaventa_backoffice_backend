import { IdValueObject } from '../../shared/domain/value-object/IdValueObject';
import {v4 as uuid} from 'uuid';

export class ClientId extends IdValueObject{
  
    public static generate(): ClientId {
        return new ClientId(uuid());
    }
}