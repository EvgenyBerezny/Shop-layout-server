import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AuthenticatedGuard } from './../auth/authenticated.guard';
import { GoodsPartsService } from './goods-parts.service';
import { Controller } from '@nestjs/common';
import {
  Body,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common/decorators';
import {
  FindOneResponse,
  GetBestsellerResponse,
  GetByNameRequest,
  GetByNameResponse,
  GetNewResponse,
  PaginateAndFilterResponse,
  SearchRequest,
  SearchResponse,
} from './types';

@Controller('goods-parts')
export class GoodsPartsController {
  constructor(private readonly goodsPartsService: GoodsPartsService) {}

  @ApiOkResponse({ type: PaginateAndFilterResponse })
  @UseGuards(AuthenticatedGuard)
  @Get()
  paginateAndFilter(@Query() query) {
    return this.goodsPartsService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: FindOneResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('find/:id')
  getOne(@Param('id') id: string) {
    return this.goodsPartsService.findOne(id);
  }

  @ApiOkResponse({ type: GetBestsellerResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('bestsellers')
  getBestseller() {
    return this.goodsPartsService.bestsellers();
  }

  @ApiOkResponse({ type: GetNewResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('new')
  getNew() {
    return this.goodsPartsService.new();
  }

  @ApiOkResponse({ type: SearchResponse })
  @ApiBody({ type: SearchRequest })
  @UseGuards(AuthenticatedGuard)
  @Post('search')
  search(@Body() { search }: { search: string }) {
    return this.goodsPartsService.searchByString(search);
  }

  @ApiOkResponse({ type: GetByNameResponse })
  @ApiBody({ type: GetByNameRequest })
  @UseGuards(AuthenticatedGuard)
  @Post('name')
  getByName(@Body() { name }: { name: string }) {
    return this.goodsPartsService.findOneByName(name);
  }
}
