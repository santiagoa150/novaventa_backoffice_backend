import { DomainRoot } from '../DomainRoot';

export abstract class SearchFilterObject implements DomainRoot{
    protected searchValue: string | RegExp;
    abstract toPrimitives(): any;
}