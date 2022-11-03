import { IClientRepository } from '../../domain/IClientRepository';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { Model } from 'mongoose';
import { ClientDocument } from './ClientDocument';
import { ClientDto } from '../../domain/ClientDto';
import { Client } from '../../domain/Client';

export class MongoClientRepository implements IClientRepository{

    private readonly logger: Logger = new Logger(MongoClientRepository.name);

    constructor(
    @InjectModel(MongoDbConstantsProvider.CLIENT_SCHEMA) private clientModel: Model<ClientDocument>,
    ) {
    }

    async create(client: ClientDto): Promise<Client> {
        this.logger.log(`[${this.create.name}] INIT :: client: ${JSON.stringify(client, null, 2)}`);
        const model = new this.clientModel(client);
        await model.save();
        const clientMapped = model ? Client.fromPrimitives(model): null;
        this.logger.log(`[${this.create.name}] FINISH ::`);
        return clientMapped;
    }
}