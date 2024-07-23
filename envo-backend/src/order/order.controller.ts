import { Body, Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { CheckoutService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.checkoutService.createOrder(createOrderDto);
  }
  @Get('/findOrders')
  async findAll() {
    return this.checkoutService.findAll();
  }
  @Get('/paidOrders')
  async findPaidOrders() {
    return this.checkoutService.findAllPaidOrders();
  }
  @Get('/unPaidOrders')
  async findUnPaidOrders() {
    return this.checkoutService.findAllUnPaidOrders();
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutService.remove(+id);
  }
}


