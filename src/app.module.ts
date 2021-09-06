import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { StatusImageModule } from './status-image/status-image.module';

@Module({
  imports: [AdminPanelModule, StatusImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
