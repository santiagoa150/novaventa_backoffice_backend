export class CreateOrderCommand {
    constructor(
    public readonly userId: string,
    public readonly year: number,
    public readonly campaign: number
    ) {
    }
}