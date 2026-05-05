import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import {
  CreateProductDto,
  messages,
  UpdateProductDto,
  UserRole,
} from '@nestjs/shared-lib';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, userId: number) {
    const product = this.productRepo.create({ ...createProductDto, userId });
    const savedProduct = await this.productRepo.save(product);

    return {
      message: messages.PRODUCT_CREATED,
      data: savedProduct,
    };
  }

  async findAll(user: { id: number; role: string }) {
    const isAdmin = (user.role as UserRole) === UserRole.ADMIN;
    const products = await this.productRepo
      .createQueryBuilder('product')
      .where(isAdmin ? '1=1' : 'product.userId = :id', {
        id: user.id,
      })
      .getMany();

    return {
      message: messages.PRODUCT_FETCHED,
      data: products,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: messages.PRODUCT_NOT_FOUND,
      });
    }
    return {
      message: messages.PRODUCT_FETCHED,
      data: product,
    };
  }

  findByName(name: string) {
    const product = this.productRepo.findOne({ where: { name } });
    return {
      message: messages.PRODUCT_FETCHED,
      data: product,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: messages.PRODUCT_NOT_FOUND,
      });
    }
    const updatedProduct = this.productRepo.merge(product, updateProductDto);
    const savedProduct = await this.productRepo.save(updatedProduct);

    return {
      message: messages.PRODUCT_UPDATED,
      data: savedProduct,
    };
  }

  async remove(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: messages.PRODUCT_NOT_FOUND,
      });
    }
    await this.productRepo.delete(id);

    return {
      message: messages.PRODUCT_DELETED,
    };
  }
}
