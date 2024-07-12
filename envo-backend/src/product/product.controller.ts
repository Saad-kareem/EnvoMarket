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
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadedFile } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  // @Post('/addProduct')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //         cb(null, `${randomName}${extname(file.originalname)}`);
  //       },
  //     }),
  //   }),
  // )
  // async uploadFile(
  //   @UploadedFile() file,
  //   @Body() createProductDto: CreateProductDto,
  // ) {
  //   createProductDto.imagePath = file.path;
  //   await this.productService.create(createProductDto);
  //   return 'success';
  // }
  @Post('/addProduct')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() file,
    @Body() body: { name: string; price: number; description: string },
  ) {
    const { name, price, description } = body;
    const imagePath = file ? file.path : null; // Assuming Multer saves the file to 'file.path'
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
