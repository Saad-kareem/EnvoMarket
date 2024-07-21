import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post('/addProduct')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() file,
    @Body() body: { name: string; price: number; description: string },
  ) {
    const { name, price, description } = body;
    const imagePath = file ? `/uploads/${file.filename}` : null; // Adjust the path accordingly
    const product = await this.productsService.create({
      name,
      price,
      description,
      imagePath,
    });
    return product;
  }    
   

  @Get('/findAllProduct')
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.productsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
