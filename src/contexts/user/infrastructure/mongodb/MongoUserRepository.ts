import { IUserRepository } from '../../domain/exceptions/IUserRepository';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { Model } from 'mongoose';
import { UserDocument } from './UserDocument';

export class MongoUserRepository implements IUserRepository {

    private readonly logger: Logger = new Logger(MongoUserRepository.name);
  
    constructor(
    @InjectModel(MongoDbConstantsProvider.USER_SCHEMA) private userModel: Model<UserDocument>,
    ) {
    }
}