import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);

    return this.orderRepository.save(order);
  }
  async findAll() {
    return await this.orderRepository.find();
  }
  async findAllPaidOrders() {
    return await this.orderRepository.find({ where: { status: 'paid' } });
  }
  async findAllUnPaidOrders() {
    return await this.orderRepository.find({ where: { status: 'unpaid' } });
  }
  remove(id: number) {
    return this.orderRepository.delete(+id);
  }

  async updatePaymentStatus(sessionId: string, status: string): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { sessionId } });
    if (!order) {
      throw new NotFoundException(
        `Order with session ID ${sessionId} not found.`,
      );
    }
    order.status = status;
    await this.orderRepository.save(order);
  }
}
