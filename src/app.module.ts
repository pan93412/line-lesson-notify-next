import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { StatusImageModule } from './status-image/status-image.module';
import { LineNotifyModule } from './line-notify/line-notify.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminPanelModule,
    StatusImageModule,
    LineNotifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
