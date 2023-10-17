import { Model, Column, Table } from "sequelize-typescript";

@Table
export class GoodsParts extends Model {
    @Column
    goods_manufacturer: string;

    @Column({ defaultValue: 0 })
    price: number;

    @Column
    goods_parts_manufacturer: string;

    @Column
    vendor_code: string;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    images: string;

    @Column({ defaultValue: 0 })
    in_stock: number;

    @Column({ defaultValue: false })
    bestseller: boolean;

    @Column({ defaultValue: false })
    new: boolean;

    @Column
    popularity: number;

    @Column
    compatibility: string;
}