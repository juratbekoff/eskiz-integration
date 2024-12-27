import { IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';

export class SendSmsDto {
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  code: number;
}
