export class UpdateClientCommand{
    constructor(
    public readonly userId: string,
    public readonly clientId: string,
    public readonly name?: string,
    public readonly phone?: number,
    public readonly description?: string,
    ) {
    }
}