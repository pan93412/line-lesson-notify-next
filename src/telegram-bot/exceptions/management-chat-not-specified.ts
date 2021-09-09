export class ManagementChatNotSpecified extends Error {
  constructor() {
    super(
      'You should specify MANAGEMENT_CHAT environment variable to make this feature work.',
    );
    this.name = 'ManagementChatNotSpecified';
  }
}
