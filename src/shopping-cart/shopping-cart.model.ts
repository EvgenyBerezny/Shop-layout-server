import { Model, Column, Table } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
  @Column
  userId: number;

  @Column
  partId: number;

  @Column
  goods_manufacturer: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  goods_parts_manufacturer: string;

  @Column
  name: string;

  @Column
  image: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: 1 })
  count: number;

  @Column({ defaultValue: 0 })
  total_price: number;
}
