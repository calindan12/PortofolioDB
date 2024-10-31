import { IsString, IsOptional, IsUrl, IsBoolean } from 'class-validator';

export class UpdateWorkDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  clientLink?: string;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
