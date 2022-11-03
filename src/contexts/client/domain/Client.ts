import { DomainRoot } from '../../shared/domain/DomainRoot';
import { ClientDto } from './ClientDto';
import { ClientId } from './ClientId';
import { UserId } from '../../user/domain/UserId';

export class Client implements DomainRoot{

    private readonly clientId: ClientId;
    private readonly userId: UserId;
    private readonly name: string;
    private readonly phone: number;
    private readonly description: string;
    
    constructor(clientId: ClientId, userId: UserId,name: string, phone: number, description: string) {
        this.clientId = clientId;
        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.description = description;
    }
    
    toPrimitives(): ClientDto {
        return {
            clientId: this.clientId.toString(),
            userId: this.userId.toString(),
            name: this.name,
            phone: this.phone,
            description: this.description,
        };
    }
  
    static fromPrimitives(client: ClientDto): Client {
        return new Client(
            new ClientId(client.clientId),
            new UserId(client.userId),
            client.name,
            client.phone,
            client.description,
        );
    }
}