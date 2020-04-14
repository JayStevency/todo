import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsDateString()
  due: Date;

  @IsNumber()
  @IsOptional()
  parentId: number;
}