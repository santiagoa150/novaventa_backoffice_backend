import { IOrderRepository } from '../../domain/IOrderRepository';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { Model } from 'mongoose';
import { OrderDocument } from './OrderDocument';

export class MongoOrderRepository implements IOrderRepository{
  
    private readonly logger: Logger = new Logger(MongoOrderRepository.name);
    
    constructor(
      @InjectModel(MongoDbConstantsProvider.ORDER_SCHEMA) private orderModel: Model<OrderDocument>,
    ) {
    }
}