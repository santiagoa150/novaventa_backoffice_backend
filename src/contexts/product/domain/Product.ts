import { DomainRoot } from '../../shared/domain/DomainRoot';
import { ProductId } from './ProductId';
import { ClientId } from '../../client/domain/ClientId';
import { UserId } from '../../user/domain/UserId';
import { ProductDto } from './ProductDto';

export class Product implements DomainRoot {

    private readonly productId: ProductId;
    private readonly clientId: ClientId;
    private readonly userId: UserId;
    private readonly name: string;
    private readonly catalogPrice: number;
    private readonly listPrice: number;
    private readonly quantity: number;
    private readonly code: string;
    private readonly imageUrl: string;

    constructor(productId: ProductId, clientId: ClientId, userId: UserId, name: string, catalogPrice: number, listPrice: number, quantity: number,
        code: string, imageUrl: string) {
        this.productId = productId;
        this.clientId = clientId;
        this.userId = userId;
        this.name = name;
        this.catalogPrice = catalogPrice;
        this.listPrice = listPrice;
        this.quantity = quantity;
        this.code = code;
        this.imageUrl = imageUrl;
    }

    toPrimitives(): ProductDto {
        return {
            productId: this.productId.toString(),
            clientId: this.clientId.toString(),
            userId: this.userId.toString(),
            name: this.name,
            catalogPrice: this.catalogPrice,
            listPrice: this.listPrice,
            quantity: this.quantity,
            code: this.code,
            imageUrl: this.imageUrl
        };
    }

    static fromPrimitives(product: ProductDto): Product {
        return new Product(
            new ProductId(product.productId),
            new ClientId(product.clientId),
            new UserId(product.userId),
            product.name,
            product.catalogPrice,
            product.listPrice,
            product.quantity,
            product.code,
            product.imageUrl
        );
    }
}