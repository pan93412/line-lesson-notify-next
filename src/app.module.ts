import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

@Module({
  imports: [AdminPanelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
