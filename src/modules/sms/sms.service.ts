import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { eskizSMS, getEnvValue, updateEnvFile } from '../../core/utils';
import * as dotenv from 'dotenv';
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

      const api = await this.getApi();
      await api.post('/message/sms/send', axiosFormData);

      return {
        message: 'SUCCESS',
      };
    } catch (error) {
      console.error(error);
    }
  }

  private async generateToken() {
    try {
      const api = await this.getApi();
      const res = await api.post(`/auth/login`, {
        email: process.env.ESKIZ_LOGIN,
        password: process.env.ESKIZ_PASSWORD,
      });

      return res?.data?.data?.token as string;
    } catch (error) {
      throw error;
    }
  }

  private async getApi() {
    const api = axios.create({
      baseURL: `https://notify.eskiz.uz/api`,
    });

    api.interceptors.request.use(async (config) => {
      const token = getEnvValue('ESKIZ_TOKEN');

      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const newToken = await this.generateToken();

          updateEnvFile('ESKIZ_TOKEN', newToken);

          dotenv.config({ override: true });

          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axios(error.config);
        }

        return Promise.reject(error);
      },
    );

    return api;
  }
}
