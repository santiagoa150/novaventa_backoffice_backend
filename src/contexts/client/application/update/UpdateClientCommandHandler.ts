import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClientCommand } from './UpdateClientCommand';
import { Logger } from '@nestjs/common';
import { ClientDto } from '../../domain/ClientDto';
import { UpdateClientApp } from './UpdateClientApp';
import { UserId } from '../../../user/domain/UserId';
import { ClientId } from '../../domain/ClientId';

@CommandHandler(UpdateClientCommand)
export class UpdateClientCommandHandler implements ICommandHandler<UpdateClientCommand>{
  
    private readonly logger: Logger = new Logger(UpdateClientCommandHandler.name);
  
    constructor(
      private readonly updateClientApp: UpdateClientApp,
    ) {
    }
    
    async execute(command: UpdateClientCommand): Promise<ClientDto> {
        this.logger.log(`[${this.execute.name}] INIT :: command: ${JSON.stringify(command, null, 2)}`);
        const client = await this.updateClientApp.execute(
            new UserId(command.userId),
            new ClientId(command.clientId),
            command.name,
            command.phone,
            command.description,
            {throwExceptionIfCantUpdate: true},
        );
        this.logger.log(`[${this.execute.name}] INIT ::`);
        return client.toPrimitives();
    }
  
}