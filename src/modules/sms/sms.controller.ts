import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SendSmsDto } from './dtos';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post()
  public SendSMS(@Body() sendSmsDto: SendSmsDto) {
    return this.smsService.send(sendSmsDto);
  }
}
