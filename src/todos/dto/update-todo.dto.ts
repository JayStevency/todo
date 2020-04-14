import {IsBoolean, IsString, IsDateString} from 'class-validator';

export class UpdateTodoDto {
  @IsBoolean()
  isChecked: boolean;

  @IsString()
  value: string;

  @IsDateString()
  due: Date;
}