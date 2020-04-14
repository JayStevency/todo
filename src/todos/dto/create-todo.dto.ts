import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsDateString()
  due: Date;

  @IsNumber()
  parentId: number;
}