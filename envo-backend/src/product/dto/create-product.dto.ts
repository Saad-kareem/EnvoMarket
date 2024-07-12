import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  id: number;
  @IsString()
  name: string;
  //  @IsString()
  //   category : string
  description: string;
  @IsString()
  price: number;
  imagePath: string;
}
