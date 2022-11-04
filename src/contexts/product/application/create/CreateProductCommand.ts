export class CreateProductCommand {
    constructor(
    public readonly userId: string,
    public readonly clientId: string,
    public readonly name: string,
    public readonly catalogPrice: number,
    public readonly listPrice: number,
    public readonly quantity: number,
    public readonly code: string,
    public readonly imageUrl: string
    ) {
    }
}