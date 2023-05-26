import { DataSource } from 'typeorm';
import {
  DATA_SOURCE,
  REPOSITORY,
} from 'src/common/constant/repository.constants';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: REPOSITORY.USER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
