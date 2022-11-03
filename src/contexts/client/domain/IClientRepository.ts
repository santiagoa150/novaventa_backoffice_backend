import { ClientDto } from './ClientDto';
import { Client } from './Client';
import { SearchFilterObject } from '../../shared/domain/value-object/SearchFilterObject';
import { PaginationParamObject } from '../../shared/domain/value-object/PaginationParamObject';
import { PaginationResponse } from '../../shared/domain/PaginationResponse';
import { UserId } from '../../user/domain/UserId';
import { ClientId } from './ClientId';

export interface IClientRepository {
  
  search(filters?: Array<SearchFilterObject>, page?: PaginationParamObject, limit?: PaginationParamObject): Promise<PaginationResponse<Client>>;

  searchById(userId: UserId, clientId: ClientId): Promise<Client>;
  
  create(client: ClientDto): Promise<Client>;

  update(client: ClientDto): Promise<Client>;
}