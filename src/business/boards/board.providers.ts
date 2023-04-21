import { DataSource } from 'typeorm';
import { Board } from './board.entity';
import {
  DATA_SOURCE,
  REPOSITORY,
} from 'src/common/constant/repository.constants';

export const boardProviders = [
  {
    provide: REPOSITORY.BOARD,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Board),
    inject: [DATA_SOURCE],
  },
];
