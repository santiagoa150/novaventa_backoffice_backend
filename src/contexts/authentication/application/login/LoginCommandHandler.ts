import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './LoginCommand';
import { Logger } from '@nestjs/common';
import { Email } from '../../../user/domain/Email';
import { LoginApp } from './LoginApp';
import { Password } from '../../../user/domain/Password';
import { UserDto } from '../../../user/domain/UserDto';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  
    private readonly logger: Logger = new Logger(LoginCommandHandler.name);
  
    constructor(
      private readonly loginApp: LoginApp,
    ) {
    }    
    
    async execute(command: LoginCommand): Promise<UserDto> {
        this.logger.log(`[${this.execute.name}] INIT ::`);
        const email = new Email(command.email);
        const password = new Password(command.password);
        const user = await this.loginApp.execute(email, password);
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return user?.toPrimitives();
    }

}