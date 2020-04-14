import { 
  IsBoolean, 
  IsString, 
  IsNotEmpty, 
  IsIn, 
  IsDateString, 
  IsOptional,
  IsNumberString
  } from 'class-validator';

export class FindAllTodoDto {
  @IsBoolean()
  @IsOptional()
  isChecked : boolean;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  value : string;

  @IsString()
  @IsIn(['asc', 'desc'])
  @IsOptional()
  sort : string;

  @IsDateString()
  @IsOptional()
  after : Date;

  @IsDateString()
  @IsOptional()
  before : Date;

  @IsNumberString()
  @IsOptional()
  page : number;

  @IsNumberString()
  @IsOptional()
  count : number;
}