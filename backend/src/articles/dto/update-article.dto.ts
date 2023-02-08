import { IsISO8601, IsOptional, ValidateIf } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  body?: string;

  @ValidateIf((dto) => dto.date)
  @IsISO8601({}, { message: 'Please follow the format yyyy-mm-dd' })
  date?: any;
}
