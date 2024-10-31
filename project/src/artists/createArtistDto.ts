import { IsString, IsOptional, IsUrl, IsEmail } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  fistName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  website?: string;


//   @IsUrl()
//   @IsOptional()
//   profileImage?: string;
}
