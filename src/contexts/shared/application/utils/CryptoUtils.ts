import {sha256} from 'js-sha256';

export class CryptoUtils{
    public static hash(value: string): string{
        return sha256(value);
    }
}