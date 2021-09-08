import { UndefinedEnvironmentVariable } from '../common/exception/undefined-environment-variable';

export default () => {
  const { LINE_SECRET } = process.env;

  if (!LINE_SECRET) throw new UndefinedEnvironmentVariable('LINE_SECRET');

  return {
    LINE_SECRET: process.env.LINE_SECRET,
  };
};
