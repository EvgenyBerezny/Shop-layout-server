import { ApiProperty } from '@nestjs/swagger';

class ShoppingCartItem {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  partId: number;

  @ApiProperty({ example: 'Sony' })
  goods_manufacturer: string;

  @ApiProperty({ example: 9583 })
  price: number;

  @ApiProperty({ example: 'Siemens' })
  goods_parts_manufacturer: string;

  @ApiProperty({ example: 'Dolorum quia.' })
  name: string;

  @ApiProperty({
    example:
      'https://loremflickr.com/640/480/technics?lock=7812275209502720?random=813871084763131405334640680648',
  })
  image: string;

  @ApiProperty({ example: 2 })
  in_stock: number;

  @ApiProperty({ example: 0 })
  count: number;

  @ApiProperty({ example: 9583 })
  total_price: number;

  @ApiProperty({ example: '2023-07-21T07:11:51.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-07-21T07:11:51.000Z' })
  updatedAt: string;
}

export class GetAllResponse extends ShoppingCartItem {}

export class AddToCartResponse extends ShoppingCartItem {}

export class UpdateCountResponse {
  @ApiProperty({ example: 1 })
  count: number;
}

export class UpdateCountRequest {
  @ApiProperty({ example: 1 })
  count: number;
}

export class TotalPriceResponse {
  @ApiProperty({ example: 9583 })
  total_price: number;
}

export class TotalPriceRequest {
  @ApiProperty({ example: 9583 })
  total_price: number;
}
