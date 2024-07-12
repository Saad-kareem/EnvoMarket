import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);

    return this.orderRepository.save(order);
  }
  remove(id: number) {
    return this.orderRepository.delete(+id);
  }
}
