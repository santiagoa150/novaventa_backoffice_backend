export class SearchClientByIdQuery {
    constructor(
    public readonly userId: string,
    public readonly clientId: string
    ) {
    }
}