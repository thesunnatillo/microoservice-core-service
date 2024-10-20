import { Controller, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Controller()
export class RabbitMQService {
  private client: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('REDIS_HOST')],
        queue: this.configService.get<string>('REDIS_QUEUE'),
      },
    });
  }

  private readonly logger = new Logger(RabbitMQService.name);

  async sendMessageToRabbit(message: any) {
    this.logger.log(`Sending message to RabbitMQ: ${JSON.stringify(message)}`);
    this.client.emit('rabbit', message);
    await this.sendToTelegram(message);
  }

  private async sendToTelegram(message: any) {
    this.logger.log(`Sending to Telegram: ${JSON.stringify(message)}`);

    const telegramUrl = `https://api.telegram.org/bot${this.configService.get<string>('TG_BOT_TOKEN')}/sendMessage`;
    const chatId = this.configService.get<string>('TG_GROUP_ID');

    await axios.post(telegramUrl, {
      chat_id: chatId,
      text: message,
    });
  }
}
