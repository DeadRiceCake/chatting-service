import { databaseConfig } from 'src/config/database.config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(databaseConfig);

      return dataSource.initialize();
    },
  },
];
