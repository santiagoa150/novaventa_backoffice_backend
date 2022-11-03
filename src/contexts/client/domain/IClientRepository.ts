import { ClientDto } from './ClientDto';
import { Client } from './Client';

export interface IClientRepository {
  create(client: ClientDto): Promise<Client>;
}