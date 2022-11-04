import { Logger } from '@nestjs/common';
import { Client } from '../../../domain/Client';
import { UserId } from '../../../../user/domain/UserId';
import { ClientId } from '../../../domain/ClientId';
import { IOptionsApp } from '../../../../shared/domain/interfaces/IOptionsApp';
import { IClientRepository } from '../../../domain/IClientRepository';
import { HttpErrorMessagesConstants } from '../../../../shared/domain/constants/HttpErrorMessagesConstants';
import { ClientNotFoundException } from '../../../domain/exceptions/ClientNotFoundException';
import { ClientFoundException } from '../../../domain/exceptions/ClientFoundException';

export class SearchClientByIdApp {

    private readonly logger: Logger = new Logger(SearchClientByIdApp.name);

    constructor(
    private readonly repository: IClientRepository
    ) {
    }

    async execute(userId: UserId, clientId: ClientId, options?: IOptionsApp): Promise<Client> {
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()} clientId: ${clientId.toString()}`);
        const client: Client = await this.repository.searchById(userId, clientId);
        if (!client && options && options.throwExceptionIfNoExists) {
            this.logger.error(`[${this.execute.name}] ERROR: ${HttpErrorMessagesConstants.CLIENT_NOT_FOUND}`);
            throw new ClientNotFoundException(HttpErrorMessagesConstants.CLIENT_NOT_FOUND);
        }
        if (client && options && options.throwExceptionIfExists) {
            this.logger.error(`[${this.execute.name}] ERROR: ${HttpErrorMessagesConstants.CLIENT_FOUND}`);
            throw new ClientFoundException(HttpErrorMessagesConstants.CLIENT_FOUND);
        }
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return client;
    }
}