import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import FormData from 'form-data';
import { RequestFailed } from './exceptions/request-failed';

type Headers = Record<string, string>;

export interface SendTextResponse {
  status: number;
  message: string;
}

@Injectable()
export class LineNotifyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private static getSendTextEndpoint() {
    return 'https://notify-api.line.me/api/notify';
  }

  private getAuthToken() {
    const secret = this.configService.get<string | null>('LINE_SECRET');
    if (!secret) throw new Error('LINE_SECRET is not specified.');

    return secret;
  }

  private withAuthHeader(
    prevHeader: Headers = {},
  ): Headers & { Authorization: string } {
    return { ...prevHeader, Authorization: `Bearer ${this.getAuthToken()}` };
  }

  async sendText(messageText: string) {
    // Construct the form to send.
    const data = new FormData();
    data.append('message', messageText);

    // Construct the header to send
    const headers = this.withAuthHeader(data.getHeaders());
    const response = await this.httpService.post<SendTextResponse>(
      LineNotifyService.getSendTextEndpoint(),
      data,
      {
        headers,
        data,
      },
    );

    response.subscribe({
      error(err) {
        throw new RequestFailed(err);
      },
    });
  }
}
