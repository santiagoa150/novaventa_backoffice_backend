import { DomainRoot } from '../../shared/domain/DomainRoot';
import { ClientDto } from './ClientDto';
import { ClientId } from './ClientId';

export class Client implements DomainRoot{

    private readonly clientId: ClientId;
    private readonly name: string;
    private readonly phone: number;
    private readonly description: string;
    
    constructor(clientId: ClientId, name: string, phone: number, description: string) {
        this.clientId = clientId;
        this.name = name;
        this.phone = phone;
        this.description = description;
    }
    
    toPrimitives(): ClientDto {
        return {
            clientId: this.clientId.toString(),
            name: this.name,
            phone: this.phone,
            description: this.description,
        };
    }
  
    static fromPrimitives(client: ClientDto): Client {
        return new Client(
            new ClientId(client.clientId),
            client.name,
            client.phone,
            client.description,
        );
    }
}