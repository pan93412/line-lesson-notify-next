import { UndefinedEnvironmentVariable } from '../common/exception/undefined-environment-variable';

export default () => {
  const { TELEGRAM_BOT_TOKEN } = process.env;

  if (!TELEGRAM_BOT_TOKEN)
    throw new UndefinedEnvironmentVariable('TELEGRAM_BOT_TOKEN');

  return {
    TELEGRAM_BOT_TOKEN,
  };
};
