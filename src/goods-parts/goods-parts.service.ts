import { IGoodsPartsFilter, IGoodsPartsQuery } from './types/index';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GoodsParts } from './goods-parts.model';
import { Op } from 'sequelize';

@Injectable()
export class GoodsPartsService {
  constructor(
    @InjectModel(GoodsParts)
    private goodsPartsModel: typeof GoodsParts,
  ) {}

  async paginateAndFilter(
    query: IGoodsPartsQuery,
  ): Promise<{ count: number; rows: GoodsParts[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    const filter = {} as Partial<IGoodsPartsFilter>;

    if (query.priceFrom && query.priceTo) {
      filter.price = {
        [Op.between]: [+query.priceFrom, +query.priceTo],
      };
    }

    if (query.goods) {
      filter.goods_manufacturer = JSON.parse(decodeURIComponent(query.goods));
    }

    if (query.parts) {
      filter.goods_parts_manufacturer = JSON.parse(
        decodeURIComponent(query.parts),
      );
    }

    return this.goodsPartsModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });
  }

  async bestsellers(): Promise<{ count: number; rows: GoodsParts[] }> {
    return this.goodsPartsModel.findAndCountAll({
      where: { bestseller: true },
    });
  }

  async new(): Promise<{ count: number; rows: GoodsParts[] }> {
    return this.goodsPartsModel.findAndCountAll({
      where: { new: true },
    });
  }

  async findOne(id: number | string): Promise<GoodsParts> {
    return this.goodsPartsModel.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<GoodsParts> {
    return this.goodsPartsModel.findOne({
      where: { name },
    });
  }

  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: GoodsParts[] }> {
    return this.goodsPartsModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
