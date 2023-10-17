import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Op } from 'sequelize';

class GoodsParts {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  goods_manufacturer: string;

  @ApiProperty({ example: 7062 })
  price: number;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  goods_parts_manufacturer: string;

  @ApiProperty({ example: faker.internet.password() })
  vendor_code: number;

  @ApiProperty({ example: faker.lorem.word() })
  name: string;

  @ApiProperty({ example: faker.lorem.sentence() })
  description: string;

  @ApiProperty({ example: faker.image.urlLoremFlickr({ category: 'city' }) })
  images: string;

  @ApiProperty({ example: 1 })
  in_stock: number;

  @ApiProperty({ example: true })
  bestseller: boolean;

  @ApiProperty({ example: false })
  new: boolean;

  @ApiProperty({ example: 137 })
  popularity: number;

  @ApiProperty({ example: faker.lorem.sentence() })
  compatibility: string;

  @ApiProperty({ example: '2023-07-21T07:11:51.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-07-21T07:11:51.000Z' })
  updatedAt: string;
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 42 })
  count: number;

  @ApiProperty({ type: GoodsParts, isArray: true })
  rows: GoodsParts;
}

export class Bestseller extends GoodsParts {
  @ApiProperty({ example: true })
  bestseller: boolean;
}

export class GetBestsellerResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 42 })
  count: number;

  @ApiProperty({ type: GoodsParts, isArray: true })
  rows: Bestseller;
}

export class NewParts extends GoodsParts {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 42 })
  count: number;

  @ApiProperty({ type: GoodsParts, isArray: true })
  rows: NewParts;
}

class SearchByLetterResponse extends GoodsParts {
  @ApiProperty({ example: 'quidem' })
  name: string;
}

export class SearchResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: SearchByLetterResponse, isArray: true })
  rows: SearchByLetterResponse;
}

export class SearchRequest {
  @ApiProperty({ example: 'qu' })
  search: string;
}

export class GetByNameResponse extends GoodsParts {
  @ApiProperty({ example: 'quidem' })
  name: string;
}
export class GetByNameRequest {
  @ApiProperty({ example: 'quidem' })
  name: string;
}

export class FindOneResponse extends GoodsParts {}

export interface IGoodsPartsQuery {
  limit: string;
  offset: string;
  goods: string | undefined;
  parts: string | undefined;
  priceFrom: string | undefined;
  priceTo: string | undefined;
}

export interface IGoodsPartsFilter {
  goods_manufacturer: string | undefined;
  goods_parts_manufacturer: string | undefined;
  price: { [Op.between]: number[] };
}
