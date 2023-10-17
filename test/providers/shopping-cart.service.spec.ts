import { ShoppingCartService } from './../../src/shopping-cart/shopping-cart.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { databaseConfig } from 'src/config/configurations';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';
import { GoodsPartsModule } from 'src/goods-parts/goods-parts.module';
import { UsersService } from 'src/users/users.service';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { GoodsPartsService } from 'src/goods-parts/goods-parts.service';
import { ShoppingCartModule } from 'src/shopping-cart/shopping-cart.module';

const mockedUser = {
  username: 'John',
  email: 'john@gmail.com',
  password: 'john123',
};

describe('Shopping Cart Service', () => {
  let app: INestApplication;
  let goodsPartsService: GoodsPartsService;
  let usersService: UsersService;
  let shoppingCartService: ShoppingCartService;

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
        ShoppingCartModule,
      ],
    }).compile();

    goodsPartsService = testModule.get<GoodsPartsService>(GoodsPartsService);
    usersService = testModule.get<UsersService>(UsersService);
    shoppingCartService =
      testModule.get<ShoppingCartService>(ShoppingCartService);

    app = testModule.createNestApplication();

    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  beforeEach(async () => {
    const cart = new ShoppingCart();
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });
    const part = await goodsPartsService.findOne(1);

    cart.userId = user.id;
    cart.partId = part.id;
    cart.goods_manufacturer = part.goods_manufacturer;
    cart.goods_parts_manufacturer = part.goods_parts_manufacturer;
    cart.price = part.price;
    cart.in_stock = part.in_stock;
    cart.image = JSON.parse(part.images)[0];
    cart.name = part.name;
    cart.total_price = part.price;

    return cart.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await ShoppingCart.destroy({ where: { partId: 1 } });
    await ShoppingCart.destroy({ where: { partId: 3 } });
  });

  it('should return all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    cart.forEach((item) =>
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          userId: user.id,
          partId: expect.any(Number),
          goods_manufacturer: expect.any(String),
          price: expect.any(Number),
          goods_parts_manufacturer: expect.any(String),
          name: expect.any(String),
          image: expect.any(String),
          in_stock: expect.any(Number),
          count: expect.any(Number),
          total_price: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ),
    );
  });

  it('should add cart items', async () => {
    await shoppingCartService.add({
      username: mockedUser.username,
      partId: 3,
    });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart.find((item) => item.partId === 3)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: expect.any(Number),
        partId: 3,
        goods_manufacturer: expect.any(String),
        price: expect.any(Number),
        goods_parts_manufacturer: expect.any(String),
        name: expect.any(String),
        image: expect.any(String),
        in_stock: expect.any(Number),
        count: expect.any(Number),
        total_price: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should return updeted count', async () => {
    const result = await shoppingCartService.updateCount(2, 1);

    expect(result).toEqual({ count: 2 });
  });

  it('should return updeted total price', async () => {
    const part = await goodsPartsService.findOne(1);
    const result = await shoppingCartService.updateTotalPrice(
      part.price * 2,
      1,
    );

    expect(result).toEqual({ total_price: part.price * 2 });
  });

  it('should delete cart item', async () => {
    await shoppingCartService.remove(1);

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart.find((item) => item.partId)).toBeUndefined();
  });

  it('should delete all cart item', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    await shoppingCartService.removeAll(user.id);

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart).toStrictEqual([]);
  });
});
