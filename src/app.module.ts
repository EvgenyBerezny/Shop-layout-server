import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/configurations';
import { AuthModule } from './auth/auth.module';
import { GoodsPartsModule } from './goods-parts/goods-parts.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    UsersModule,
    AuthModule,
    GoodsPartsModule,
    ShoppingCartModule,
    PaymentModule,
  ],
})
export class AppModule {}
