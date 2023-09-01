import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: string;

  @Column()
  nickname: string;

  @Column()
  mobile_number: string;

  @Column()
  is_activated: boolean;

  @Column()
  rating_score: number;

  @Column()
  created_at: Date;

  @OneToMany(() => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
