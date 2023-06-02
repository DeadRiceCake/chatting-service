import { utilities, WinstonModuleOptions } from 'nest-winston';
import winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';

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
  transports: [
    new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike('chatting-server', {
          colors: true,
        }),
      ),
    }),

    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
};
