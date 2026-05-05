import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateProductDto,
  MessagePatterns,
  UpdateProductDto,
} from '@nestjs/shared-lib';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern(MessagePatterns.PRODUCT_CREATE)
  create(@Payload() payload: { dto: CreateProductDto; userId: number }) {
    const { dto, userId } = payload;
    return this.productService.create(dto, userId);
  }

  @MessagePattern(MessagePatterns.PRODUCT_GET_ALL)
  findAll(@Payload() user: { id: number; role: string }) {
    return this.productService.findAll(user);
  }

  @MessagePattern(MessagePatterns.PRODUCT_GET_ONE)
  findOne(@Payload() id: number) {
    return this.productService.findOne(id);
  }

  @MessagePattern(MessagePatterns.PRODUCT_GET_BY_NAME)
  findByName(@Payload() name: string) {
    return this.productService.findByName(name);
  }

  @MessagePattern(MessagePatterns.PRODUCT_UPDATE)
  update(@Payload() payload: { id: number; dto: UpdateProductDto }) {
    const { id, dto } = payload;
    return this.productService.update(id, dto);
  }

  @MessagePattern(MessagePatterns.PRODUCT_DELETE)
  remove(@Payload() id: number) {
    return this.productService.remove(id);
  }
}
