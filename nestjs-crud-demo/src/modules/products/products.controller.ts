import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from 'src/common/decoraters/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiErrorResponseWrapped, ApiOkResponseWrapped } from 'src/common/swagger/api-response.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import {
  DeleteProductResponseDto,
  ProductListResponseDto,
  ProductResponseDto,
} from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@ApiBearerAuth('access-token')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new product (requires auth)' })
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponseWrapped(ProductResponseDto)
  @ApiErrorResponseWrapped(HttpStatus.BAD_REQUEST, 'Validation error', 'Invalid input data')
  @ApiErrorResponseWrapped(HttpStatus.UNAUTHORIZED, 'Missing or invalid JWT token', 'Unauthorized')
  @ApiErrorResponseWrapped(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Unexpected server error',
    'Internal server error',
  )
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    const user = req.user as User;
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get all products (admins see all; regular users see only their own)',
  })
  @ApiOkResponseWrapped(ProductListResponseDto, true)
  @ApiErrorResponseWrapped(HttpStatus.UNAUTHORIZED, 'Missing or invalid JWT token', 'Unauthorized')
  @ApiErrorResponseWrapped(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Unexpected server error',
    'Internal server error',
  )
  findAll(@Req() req: Request) {
    const user = req.user as User;
    return this.productsService.findAll(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Product ID' })
  @ApiOkResponseWrapped(ProductResponseDto)
  @ApiErrorResponseWrapped(HttpStatus.NOT_FOUND, 'Product not found', 'Product not found.')
  @ApiErrorResponseWrapped(HttpStatus.UNAUTHORIZED, 'Missing or invalid JWT token', 'Unauthorized')
  @ApiErrorResponseWrapped(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Unexpected server error',
    'Internal server error',
  )
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponseWrapped(ProductResponseDto)
  @ApiErrorResponseWrapped(HttpStatus.BAD_REQUEST, 'Validation error', 'Invalid input data')
  @ApiErrorResponseWrapped(HttpStatus.NOT_FOUND, 'Product not found', 'Product not found.')
  @ApiErrorResponseWrapped(HttpStatus.UNAUTHORIZED, 'Missing or invalid JWT token', 'Unauthorized')
  @ApiErrorResponseWrapped(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Unexpected server error',
    'Internal server error',
  )
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a product by ID (admin only)' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Product ID' })
  @ApiOkResponseWrapped(DeleteProductResponseDto)
  @ApiErrorResponseWrapped(HttpStatus.NOT_FOUND, 'Product not found', 'Product not found.')
  @ApiErrorResponseWrapped(HttpStatus.UNAUTHORIZED, 'Missing or invalid JWT token', 'Unauthorized')
  @ApiErrorResponseWrapped(
    HttpStatus.FORBIDDEN,
    'Insufficient role — admin required',
    'Forbidden resource',
  )
  @ApiErrorResponseWrapped(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Unexpected server error',
    'Internal server error',
  )
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
