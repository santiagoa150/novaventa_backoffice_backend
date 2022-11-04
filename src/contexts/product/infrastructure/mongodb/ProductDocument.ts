import { ProductDto } from '../../domain/ProductDto';
import { Document, Schema } from 'mongoose';

export type ProductDocument = Product & Document;

export type Product = Required<Omit<ProductDto, '_id'>>;

export const ProductSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    clientId: {
        type: String,
        required: true,
        index: true
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    catalogPrice: {
        type: Number,
        required: true
    },
    listPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    code: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });