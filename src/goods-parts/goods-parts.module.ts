import { Module } from '@nestjs/common';
import { GoodsPartsController } from './goods-parts.controller';
import { GoodsPartsService } from './goods-parts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { GoodsParts } from './goods-parts.model';

@Module({
  imports: [SequelizeModule.forFeature([GoodsParts])],
  controllers: [GoodsPartsController],
  providers: [GoodsPartsService],
  exports: [GoodsPartsService],
})
export class GoodsPartsModule {}
