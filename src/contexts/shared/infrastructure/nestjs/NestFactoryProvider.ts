export interface NestFactoryProvider {
  imports?: any;
  useFactory: (() => any) | ((...any) => any);
  provide: any;
  inject?: any;
}
