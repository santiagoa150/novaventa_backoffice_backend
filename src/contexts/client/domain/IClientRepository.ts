import { ClientDto } from './ClientDto';
import { Client } from './Client';
import { SearchFilterObject } from '../../shared/domain/value-object/SearchFilterObject';
import { PaginationParamObject } from '../../shared/domain/value-object/PaginationParamObject';
import { PaginationResponse } from '../../shared/domain/PaginationResponse';

export interface IClientRepository {
  
  search(filters?: Array<SearchFilterObject>, page?: PaginationParamObject, limit?: PaginationParamObject): Promise<PaginationResponse<Client>>;
  
  create(client: ClientDto): Promise<Client>;
}