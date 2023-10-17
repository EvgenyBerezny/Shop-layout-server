import { GoodsPartsService } from './../goods-parts/goods-parts.service';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { AddToCartDto } from './dto/add-to-cart.sto';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectModel(ShoppingCart)
        private shoppingCartModel: typeof ShoppingCart,
        private readonly usersService: UsersService,
        private readonly goodsPartsService: GoodsPartsService,
    ) {}

    async findAll(userId: number | string): Promise<ShoppingCart[]> {
        return this.shoppingCartModel.findAll({ where: { userId }});
    }

    async add(addToCartDto: AddToCartDto) {
        const cart = new ShoppingCart();
        const user = await this.usersService.findOne({ where: { username: addToCartDto.username } });
        const part = await this.goodsPartsService.findOne(addToCartDto.partId);

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
    }

    async updateCount(count: number, partId: number | string): Promise<{ count: number}> {
        await this.shoppingCartModel.update({ count }, { where: { partId } })

        const part = await this.shoppingCartModel.findOne({ where: { partId } });
        return { count: part.count }
    }

    async updateTotalPrice(total_price: number, partId: number | string): Promise<{ total_price: number}> {
        await this.shoppingCartModel.update({ total_price }, { where: { partId } })

        const part = await this.shoppingCartModel.findOne({ where: { partId } });
        return { total_price: part.total_price }
    }

    async remove(partId: number | string): Promise<void> {
        const part = await this.shoppingCartModel.findOne({ where: { partId } });

        await part.destroy();
    }

    async removeAll(userId: number | string): Promise<void> {     
        await this.shoppingCartModel.destroy({ where: {userId} })
    }
}
