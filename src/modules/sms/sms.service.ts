import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { eskizSMS } from '../../core/utils';
import { SendSmsDto } from './dtos';

@Injectable()
export class SmsService {
  constructor() {}

  async send(sendSmsDto: SendSmsDto) {
    const { phone, code } = sendSmsDto;

    try {
      const message = eskizSMS(code);

      const axiosFormData = {
        mobile_phone: phone,
        message,
        from: 4546,
      };

      const token = process.env.ESKIZ_TOKEN;

      const res = await axios.post(
        'https://notify.eskiz.uz/api/message/sms/send',
        axiosFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }
}
