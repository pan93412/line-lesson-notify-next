import type { Readable } from 'stream';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FormData from 'form-data';
import axios from 'axios';
import { UndefinedEnvironmentVariable } from '../common/exception/undefined-environment-variable';

type Headers = Record<string, string>;

export interface SendEndpointResponse {
  status: number;
  message: string;
}

@Injectable()
export class LineNotifyService {
  constructor(private readonly configService: ConfigService) {}

  private static getSendEndpoint() {
    return 'https://notify-api.line.me/api/notify';
  }

  private getAuthToken(): string {
    const LINE_SECRET = this.configService.get<string>('LINE_SECRET');

    if (!LINE_SECRET) throw new UndefinedEnvironmentVariable('LINE_SECRET');

    return LINE_SECRET;
  }

  private withAuthHeader(
    prevHeader: Headers = {},
  ): Headers & { Authorization: string } {
    return { ...prevHeader, Authorization: `Bearer ${this.getAuthToken()}` };
  }

  private async commonSend(data: FormData): Promise<SendEndpointResponse> {
    // Construct the header to send
    const headers = this.withAuthHeader(data.getHeaders());
    const response = await axios.post<SendEndpointResponse>(
      LineNotifyService.getSendEndpoint(),
      data,
      {
        headers,
        data,
      },
    );

    return response.data;
  }

  async sendText(messageText: string, notificationDisabled = false) {
    // Construct the form to send.
    const data = new FormData();
    data.append('message', messageText);
    data.append('notificationDisabled', notificationDisabled.toString());

    return this.commonSend(data);
  }

  async sendWithImage(
    messageText: string,
    imageData: Readable,
    notificationDisabled = false,
  ) {
    // Construct the form to send.
    const data = new FormData();
    data.append('message', messageText);
    data.append('imageFile', imageData);
    data.append('notificationDisabled', notificationDisabled.toString());

    return this.commonSend(data);
  }
}
