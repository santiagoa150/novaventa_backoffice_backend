import { SearchFilterObject } from './SearchFilterObject';
import { FilterValueObject } from './FilterValueObject';

export class EqSearchFilterDto{
    searchValue: string | RegExp;
    searchParam: string;
}

export class EqSearchFilter extends SearchFilterObject{
    
    searchValue;
    private readonly searchParam: FilterValueObject;
  
    constructor(value: string | RegExp, param: FilterValueObject) {
        super();
        this.searchValue = value;
        this.searchParam = param;
    }
  
    toPrimitives(): EqSearchFilterDto {
        return {
            searchValue: this.searchValue,
            searchParam: this.searchParam.toString()
        };
    }

}