import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClientCommand } from './CreateClientCommand';
import { Logger } from '@nestjs/common';
import { ClientDto } from '../../domain/ClientDto';
import { Client } from '../../domain/Client';
import { CreateClientApp } from './CreateClientApp';
import { UserId } from '../../../user/domain/UserId';

@CommandHandler(CreateClientCommand)
export class CreateClientCommandHandler implements ICommandHandler<CreateClientCommand>{
  
    private readonly logger: Logger = new Logger(CreateClientCommandHandler.name);
    
    constructor(
      private readonly createClientApp: CreateClientApp,
    ) {
    }
    
    async execute(command: CreateClientCommand): Promise<ClientDto> {
        this.logger.log(`[${this.execute.name}] INIT :: command: ${JSON.stringify(command)}`);
        const client: Client = await this.createClientApp.execute(
            new UserId(command.userId),
            command.name,
            command.description,
            command.phone,
        );
        this.logger.log(`[${this.execute.name}] FINISH :: client: ${JSON.stringify(client, null, 2)}`);
        return client.toPrimitives();
    }
}