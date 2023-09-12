import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../../../../boards/board.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mobile_number: string;

  @Column({ type: 'boolean', default: true })
  is_activated: boolean;

  @Column({ default: 'user' })
  role: string;

  @Column()
  nickname: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 36.5 })
  rating_score: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
