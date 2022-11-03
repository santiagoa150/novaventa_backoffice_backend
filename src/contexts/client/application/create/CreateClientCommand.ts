export class CreateClientCommand {
    constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly phone: number,
    public readonly description: string
    ) {
    }
}