import { IUserRepository } from '../../domain/IUserRepository';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { Model } from 'mongoose';
import { UserDocument } from './UserDocument';
import { Email } from '../../domain/Email';
import { User } from '../../domain/User';

export class MongoUserRepository implements IUserRepository {

    private readonly logger: Logger = new Logger(MongoUserRepository.name);

    constructor(
    @InjectModel(MongoDbConstantsProvider.USER_SCHEMA) private userModel: Model<UserDocument>
    ) {
    }

    async searchByEmail(email: Email): Promise<User> {
        this.logger.log(`[${this.searchByEmail.name}] INIT :: email: ${email.toString()}`);
        const userFound = await this.userModel.findOne({ email: email.toString() });
        const userMapped = userFound ? User.fromPrimitives(userFound) : null;
        this.logger.log(`[${this.searchByEmail.name}] FINISH ::`);
        return userMapped;
    }
}