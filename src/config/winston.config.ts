import { utilities, WinstonModuleOptions } from 'nest-winston';
import winstonDaily from 'winston-daily-rotate-file';
import { format, transports } from 'winston';

const logDir = __dirname + '/../logs';

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30,
  };
};

export const winstonConfig: WinstonModuleOptions = {
  format: format.combine(
    format.timestamp(),
    format.ms(),
    utilities.format.nestLike('chatting-server', {
      colors: true,
    }),
  ),
  transports: [
    new transports.Console(),
    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
};
