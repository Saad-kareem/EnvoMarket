import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post('/addProduct')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, '/media/saad/D/EnvoMarket/envo-backend/uploads');
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createProduct(
    @UploadedFile() file,
    @Body() body: { name: string; price: number; description: string },
  ) {
    const { name, price, description } = body;
    const imagePath = file
      ? `/media/saad/D/EnvoMarket/envo-backend/uploads/${file.filename}`
      : null;
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
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Delete('/remove/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}

