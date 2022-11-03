import { Logger } from '@nestjs/common';
import { UserId } from '../../../user/domain/UserId';
import { Client } from '../../domain/Client';
import { ClientDto } from '../../domain/ClientDto';
import { ClientId } from '../../domain/ClientId';
import { IClientRepository } from '../../domain/IClientRepository';
import { IOptionsApp } from '../../../shared/domain/interfaces/IOptionsApp';
import { ClientNotCreatedException } from '../../domain/exceptions/ClientNotCreatedException';
import { HttpErrorMessagesConstants } from '../../../shared/domain/constants/HttpErrorMessagesConstants';

export class CreateClientApp {

    private readonly logger: Logger = new Logger(CreateClientApp.name);

    constructor(
    private readonly repository: IClientRepository
    ) {
    }

    async execute(userId: UserId, name: string, description: string, phone: number, options?: IOptionsApp): Promise<Client> {
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()}, name: ${name}, description: ${description}, phone: ${phone}`);
        const template = await this.mapClient(userId, name, description, phone);
        const client = await this.repository.create(template);
        if (!client && options && options.throwExceptionIfCantCreate) {
            this.logger.error(`[${this.execute.name}] ERROR :: ${HttpErrorMessagesConstants.CLIENT_NOT_CREATED}`);
            throw new ClientNotCreatedException(HttpErrorMessagesConstants.CLIENT_NOT_CREATED);
        }
        this.logger.log(`[${this.execute.name}] FINISH :: `);
        return client;
    }

    async mapClient(userId: UserId, name: string, description: string, phone: number): Promise<ClientDto> {
        this.logger.log(`[${this.mapClient.name}] INIT ::`);
        const clientDto = {
            clientId: ClientId.generate().toString(),
            userId: userId.toString(),
            name: name,
            description: description,
            phone: phone
        };
        this.logger.log(`[${this.mapClient.name}] FINISH :: NEW CLIENT: ${JSON.stringify(clientDto, null, 2)}`);
        return clientDto;
    }
}