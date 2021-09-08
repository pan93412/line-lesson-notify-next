import type { Readable } from 'stream';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FormData from 'form-data';
import axios from 'axios';

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
