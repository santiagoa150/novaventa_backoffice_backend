import { UserDto } from '../../domain/UserDto';
import { Document, Schema } from 'mongoose';

export type User = Required<Omit<UserDto, '_id'>>;

export type UserDocument = User & Document;

export const UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true,
        unique:true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required:true,
        default: true,
    }
});