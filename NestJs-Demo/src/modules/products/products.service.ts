import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { UserRole } from 'src/constants/user-roles.enum';
import { messages } from 'src/constants/messages.constants';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    const product = this.productRepo.create({ ...createProductDto, user });
    return this.productRepo.save(product);
  }

  findAll(user: User) {
    return this.productRepo
      .createQueryBuilder('product')
      .leftJoin('product.user', 'user')
      .addSelect(['user.id', 'user.email', 'user.name'])
      .where(user.role === UserRole.ADMIN ? '1=1' : 'user.id = :id', {
        id: user.id,
      })
      .getMany();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(messages.PRODUCT_NOT_FOUND);
    }
    return this.productRepo.findOne({ where: { id }, relations: ['user'] });
  }

  findByName(name: string) {
    return this.productRepo.findOne({ where: { name } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepo.update(id, updateProductDto);
    return this.productRepo.findOneBy({ id });
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
