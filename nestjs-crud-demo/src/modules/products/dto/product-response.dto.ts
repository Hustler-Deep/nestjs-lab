import { ApiProperty } from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/common/swagger/api-response.dto';

export class ProductOwnerDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}

export class ProductDataDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Wireless Headphones' })
  name: string;

  @ApiProperty({ example: 'Premium noise-cancelling wireless headphones' })
  description: string;

  @ApiProperty({ example: 49.99 })
  price: number;

  @ApiProperty({ example: '2026-05-07T08:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-05-07T08:00:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: string | null;

  @ApiProperty({ type: ProductOwnerDto, required: false })
  user?: ProductOwnerDto;
}

export class ProductResponseDto extends ApiSuccessResponse<ProductDataDto> {
  @ApiProperty({ type: ProductDataDto })
  declare data: ProductDataDto;
}

export class ProductListResponseDto extends ApiSuccessResponse<ProductDataDto[]> {
  @ApiProperty({ type: [ProductDataDto] })
  declare data: ProductDataDto[];
}

export class DeleteProductDataDto {
  @ApiProperty({ example: 1, description: 'Number of rows affected' })
  affected: number | null;
}

export class DeleteProductResponseDto extends ApiSuccessResponse<DeleteProductDataDto> {
  @ApiProperty({ type: DeleteProductDataDto })
  declare data: DeleteProductDataDto;
}
