import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Controller, Logger } from '@nestjs/common';

@Controller()
export abstract class ApiController {

    protected logger: Logger;

    constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
    }

    protected async dispatch(command): Promise<any> {
        return this.commandBus.execute(command);
    }

    protected async query(command): Promise<any> {
        return this.queryBus.execute(command);
    }
}
