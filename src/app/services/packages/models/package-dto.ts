/* tslint:disable */
import { ProductDto } from './product-dto';
export interface PackageDto {
  description?: string;
  id?: number;
  name?: string;
  price?: number;
  products?: Array<ProductDto>;
}
