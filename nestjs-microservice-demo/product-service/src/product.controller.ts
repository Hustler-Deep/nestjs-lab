import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto, UpdateProductDto } from '@nestjs/shared-lib';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'create_product' })
  create(@Payload() payload: { dto: CreateProductDto; userId: number }) {
    const { dto, userId } = payload;
    return this.productService.create(dto, userId);
  }

  @MessagePattern({ cmd: 'get_products' })
  findAll(@Payload() user: { id: number; role: string }) {
    return this.productService.findAll(user);
  }

  @MessagePattern({ cmd: 'get_product' })
  findOne(@Payload() id: number) {
    return this.productService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_product_by_name' })
  findByName(@Payload() name: string) {
    return this.productService.findByName(name);
  }

  @MessagePattern({ cmd: 'update_product' })
  update(@Payload() payload: { id: number; dto: UpdateProductDto }) {
    const { id, dto } = payload;
    return this.productService.update(id, dto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload() id: number) {
    return this.productService.remove(id);
  }
}
