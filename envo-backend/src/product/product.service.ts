import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
 
  ) {}


  // async create(createProductDto: CreateProductDto): Promise<Product> {
  //   const product = new Product();
  //   product.name = createProductDto.name;
  //   product.price = createProductDto.price;
  //   product.description = createProductDto.description;
  //   product.imagePath = createProductDto.imagePath;
  //   return await this.productRepository.save(product);
  // }
  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  update(id: number) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
