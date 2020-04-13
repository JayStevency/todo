import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsDateString()
  due: Date;
}