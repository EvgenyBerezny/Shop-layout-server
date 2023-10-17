import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { UsersModule } from 'src/users/users.module';
import { GoodsPartsModule } from 'src/goods-parts/goods-parts.module';

@Module({
  imports: [SequelizeModule.forFeature([ShoppingCart]), UsersModule, GoodsPartsModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService]
})
export class ShoppingCartModule {}
