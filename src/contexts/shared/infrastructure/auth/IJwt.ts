export interface IJwt {
    sign(payload: string | object | any): string;
    verify(token: string): any;
}
