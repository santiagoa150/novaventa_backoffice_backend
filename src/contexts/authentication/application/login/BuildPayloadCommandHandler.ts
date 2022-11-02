import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BuildPayloadCommand } from './BuildPayloadCommand';
import { Logger } from '@nestjs/common';
import { LoginAppResponse } from './LoginAppResponse';
import { LoginApp } from './LoginApp';

@CommandHandler(BuildPayloadCommand)
export class BuildPayloadCommandHandler implements ICommandHandler<BuildPayloadCommand>{
  
    private readonly logger: Logger = new Logger(BuildPayloadCommandHandler.name);
    
    constructor(
      private readonly loginApp: LoginApp,
    ) {
    }
    
    async execute(command: BuildPayloadCommand): Promise<LoginAppResponse>{
        this.logger.log(`[${this.execute.name}] INIT :: command: ${JSON.stringify(command)}`);
        const response = await this.loginApp.login(command.user);
        this.logger.log(`[${this.execute.name}] FINISH :: response: ${JSON.stringify(response)}`);
        return response;
    }
}