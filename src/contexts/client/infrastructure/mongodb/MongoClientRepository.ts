import { IClientRepository } from '../../domain/IClientRepository';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { Model } from 'mongoose';
import { ClientDocument } from './ClientDocument';

export class MongoClientRepository implements IClientRepository{
    private readonly logger: Logger = new Logger(MongoClientRepository.name);

    constructor(
    @InjectModel(MongoDbConstantsProvider.CLIENT_SCHEMA) private clientModel: Model<ClientDocument>,
    ) {
    }
}