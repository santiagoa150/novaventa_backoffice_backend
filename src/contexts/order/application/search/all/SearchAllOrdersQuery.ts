export class SearchAllOrdersQuery{
    constructor(
    public readonly userId: string,
    public readonly page: number,
    public readonly limit: number,
    ) {
    }
}