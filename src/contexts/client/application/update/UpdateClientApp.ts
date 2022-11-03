import { Logger } from '@nestjs/common';
import { UserId } from '../../../user/domain/UserId';
import { ClientId } from '../../domain/ClientId';
import { Client } from '../../domain/Client';
import { SearchClientByIdApp } from '../search/by-id/SearchClientByIdApp';
import { IClientRepository } from '../../domain/IClientRepository';
import { IOptionsApp } from '../../../shared/domain/interfaces/IOptionsApp';
import { HttpErrorMessagesConstants } from '../../../shared/domain/constants/HttpErrorMessagesConstants';
import { ClientNotUpdatedException } from '../../domain/exceptions/ClientNotUpdatedException';

export class UpdateClientApp{
  
    private readonly logger: Logger = new Logger(UpdateClientApp.name);
    
    constructor(
      private readonly searchClientByIdApp: SearchClientByIdApp,
      private readonly repository: IClientRepository,
    ) {
    }
    
    async execute(userId: UserId, clientId: ClientId, name?: string, phone?: number, description?: string, options?: IOptionsApp): Promise<Client>{
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()} clientId: ${clientId.toString()} name: ${name} description: ${description} phone: ${phone}`);
        const client: Client = await this.searchClientByIdApp.execute(userId, clientId, {throwExceptionIfNoExists: true});
        const newTemplate = client.toPrimitives();
        newTemplate.name = name ? name : newTemplate.name;
        newTemplate.phone = phone ? phone : newTemplate.phone;
        newTemplate.description = description ? description: newTemplate.description;
        const newClient = await this.repository.update(newTemplate);
        if(!newClient && options && options.throwExceptionIfCantUpdate){
            this.logger.log(`[${this.execute.name}] ERROR :: ${HttpErrorMessagesConstants.CLIENT_NOT_UPDATED}`);
            throw new ClientNotUpdatedException(HttpErrorMessagesConstants.CLIENT_NOT_UPDATED);
        }
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return newClient;
    }
}