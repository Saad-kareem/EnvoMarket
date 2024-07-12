import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
  @IsString()
  userEmail: string;
  @IsString()
  userAddress: string;
   @IsNumber()
   TotalPrice : number
}
