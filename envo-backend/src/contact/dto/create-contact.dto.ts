import { IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  FullName: string;
  @IsString()
  Email: string;
  @IsString()
  Subject: string;
  @IsString()
  Message: string;
}
