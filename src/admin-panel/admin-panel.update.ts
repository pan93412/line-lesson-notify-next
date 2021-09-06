import { Update, Start, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { AdminPanelService } from './admin-panel.service';

@Update()
export class AdminPanelUpdate {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  @Start()
  async startCommand(ctx: Context) {
    return this.adminPanelService.welcomeMessage(ctx);
  }

  @Command('enable')
  async enableService(ctx: Context) {
    return this.adminPanelService.enableReminder(ctx);
  }

  @Command('disable')
  async disableService(ctx: Context) {
    return this.adminPanelService.disableReminder(ctx);
  }
}
