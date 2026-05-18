import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiErrorResponseWrapped,
  ApiOkMessageOnly,
  ApiOkResponseWrapped,
  CreateProductDto,
  CustomRequest,
  MessagePatterns,
  messages,
  ProductDataDto,
  Roles,
  ServiceTokens,
  UpdateProductDto,
} from '@nestjs/shared-lib';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Products')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ServiceTokens.PRODUCT_SERVICE)
    private readonly productService: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponseWrapped(ProductDataDto)
  @ApiErrorResponseWrapped(400, 'Validation error', 'Product name is required.')
  @ApiErrorResponseWrapped(401, 'Unauthorized', messages.UNAUTHORIZED)
  createProduct(@Body() dto: CreateProductDto, @Req() req: CustomRequest) {
    const user = req.user;
    return firstValueFrom(
      this.productService.send(MessagePatterns.PRODUCT_CREATE, {
        dto,
        userId: user.id,
      }),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all products (admin: all, user: own)' })
  @ApiOkResponseWrapped(ProductDataDto, true)
  @ApiErrorResponseWrapped(401, 'Unauthorized', messages.UNAUTHORIZED)
  getProducts(@Req() req: CustomRequest) {
    const user = req.user;
    return firstValueFrom(
      this.productService.send(MessagePatterns.PRODUCT_GET_ALL, {
        id: user.id,
        role: user.role,
      }),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  @ApiOkResponseWrapped(ProductDataDto)
  @ApiErrorResponseWrapped(401, 'Unauthorized', messages.UNAUTHORIZED)
  @ApiErrorResponseWrapped(404, 'Product not found', messages.PRODUCT_NOT_FOUND)
  getProduct(@Param('id') id: string) {
    return firstValueFrom(this.productService.send(MessagePatterns.PRODUCT_GET_ONE, Number(id)));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponseWrapped(ProductDataDto)
  @ApiErrorResponseWrapped(400, 'Validation error', 'Product name must be a string.')
  @ApiErrorResponseWrapped(401, 'Unauthorized', messages.UNAUTHORIZED)
  @ApiErrorResponseWrapped(404, 'Product not found', messages.PRODUCT_NOT_FOUND)
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return firstValueFrom(
      this.productService.send(MessagePatterns.PRODUCT_UPDATE, {
        id: Number(id),
        dto,
      }),
    );
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Soft-delete a product by ID (admin only)' })
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  @ApiOkMessageOnly(messages.PRODUCT_DELETED)
  @ApiErrorResponseWrapped(401, 'Unauthorized', messages.UNAUTHORIZED)
  @ApiErrorResponseWrapped(403, 'Forbidden — admin only', messages.ACCESS_DENIED)
  @ApiErrorResponseWrapped(404, 'Product not found', messages.PRODUCT_NOT_FOUND)
  deleteProduct(@Param('id') id: string) {
    return firstValueFrom(this.productService.send(MessagePatterns.PRODUCT_DELETE, Number(id)));
  }
}
