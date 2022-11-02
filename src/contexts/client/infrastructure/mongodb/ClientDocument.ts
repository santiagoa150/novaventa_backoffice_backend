import { ClientDto } from '../../domain/ClientDto';
import { Document, Schema } from 'mongoose';

export type Client = Required<Omit<ClientDto, '_id'>>;

export type ClientDocument = Client & Document;

export const ClientSchema = new Schema({
    clientId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: '',
    }
});