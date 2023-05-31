import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne(() => User, (user) => user.boards, {
    createForeignKeyConstraints: false,
  })
  user: User;
}
