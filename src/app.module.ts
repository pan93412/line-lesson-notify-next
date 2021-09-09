import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { LineNotifyModule } from './line-notify/line-notify.module';
import { CourseManagerModule } from './course-manager/course-manager.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminPanelModule,
    LineNotifyModule,
    CourseManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
