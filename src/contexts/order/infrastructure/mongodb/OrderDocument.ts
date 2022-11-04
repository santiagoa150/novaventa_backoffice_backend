import { OrderDto } from '../../domain/OrderDto';
import { Document, Schema } from 'mongoose';
import { OrderStatusConstants } from '../../domain/OrderStatusConstants';

export type OrderDocument = Order & Document;

export type Order = Required<Omit<OrderDto, '_id'>>;

export const OrderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
        index: true,
    },
    year: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: OrderStatusConstants.PENDING,
    },
    totalProducts: {
        type: Number,
        required: true,
        default: 0,
    },
    campaign: {
        type: Number,
        required: true,
    }
}, {timestamps: true});