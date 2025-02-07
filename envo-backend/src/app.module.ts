import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { StripeModule } from './stripe/stripe.module';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { MailModule } from './mail/mail.module';
import { ContactModule } from './contact/contact.module';
import { Contact } from './contact/entities/contact.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Product, Order, Contact],
        synchronize: true,
      }),
    }),

    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    StripeModule,
    MailModule,
    ContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
