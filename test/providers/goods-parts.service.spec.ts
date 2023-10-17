import { GoodsPartsService } from './../../src/goods-parts/goods-parts.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { databaseConfig } from 'src/config/configurations';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';
import { GoodsPartsModule } from 'src/goods-parts/goods-parts.module';

describe('Goods Parts Service', () => {
  let app: INestApplication;
  let goodsPartsService: GoodsPartsService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        GoodsPartsModule,
      ],
    }).compile();

    goodsPartsService = testModule.get<GoodsPartsService>(GoodsPartsService);
    app = testModule.createNestApplication();

    await app.init();
  });

  it('should find by id', async () => {
    const part = await goodsPartsService.findOne(1);

    expect(part.dataValues).toEqual(
      expect.objectContaining({
        id: 1,
        goods_manufacturer: expect.any(String),
        price: expect.any(Number),
        goods_parts_manufacturer: expect.any(String),
        vendor_code: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        images: expect.any(String),
        in_stock: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        popularity: expect.any(Number),
        compatibility: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should find by name', async () => {
    const part = await goodsPartsService.findOneByName('Vel culpa.');

    expect(part.dataValues).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        goods_manufacturer: expect.any(String),
        price: expect.any(Number),
        goods_parts_manufacturer: expect.any(String),
        vendor_code: expect.any(String),
        name: 'Vel culpa.',
        description: expect.any(String),
        images: expect.any(String),
        in_stock: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        popularity: expect.any(Number),
        compatibility: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should find by string', async () => {
    const part = await goodsPartsService.searchByString('io');

    expect(part.rows.length).toBeLessThanOrEqual(20);

    part.rows.forEach((item) => {
      expect(item.name.toLowerCase()).toContain('io');
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          goods_manufacturer: expect.any(String),
          price: expect.any(Number),
          goods_parts_manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: expect.any(Boolean),
          popularity: expect.any(Number),
          compatibility: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  it('should find bestsellers', async () => {
    const part = await goodsPartsService.bestsellers();

    part.rows.forEach((item) => {
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          goods_manufacturer: expect.any(String),
          price: expect.any(Number),
          goods_parts_manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: true,
          new: expect.any(Boolean),
          popularity: expect.any(Number),
          compatibility: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  it('should find new', async () => {
    const part = await goodsPartsService.new();

    part.rows.forEach((item) => {
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          goods_manufacturer: expect.any(String),
          price: expect.any(Number),
          goods_parts_manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: true,
          popularity: expect.any(Number),
          compatibility: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });
});
