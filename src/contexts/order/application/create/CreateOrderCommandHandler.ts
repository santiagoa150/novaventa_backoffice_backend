import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './CreateOrderCommand';
import { Logger } from '@nestjs/common';
import { OrderDto } from '../../domain/OrderDto';
import { CreateOrderApp } from './CreateOrderApp';
import { UserId } from '../../../user/domain/UserId';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler<CreateOrderCommand> {

    private readonly logger: Logger = new Logger(CreateOrderCommandHandler.name);

    constructor(
    private readonly createOrderApp: CreateOrderApp
    ) {
    }

    async execute(command: CreateOrderCommand): Promise<OrderDto> {
        this.logger.log(`[${this.execute.name}] INIT :: command: ${JSON.stringify(command, null, 2)}`);
        const order = await this.createOrderApp.execute(
            new UserId(command.userId),
            command.year,
            command.campaign
        );
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return order.toPrimitives();
    }

}