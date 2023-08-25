import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Board } from './board.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async getAllBoards(userId: string): Promise<Board[]> {
    return await this.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async createBoard(
    title: string,
    description: string,
    userId: string,
  ): Promise<Board> {
    const board = this.create({
      title,
      description,
      status: 'PUBLIC',
      user: {
        id: userId,
      },
    });

    await this.save(board);

    return board;
  }

  async getBoardById(id: number): Promise<Board | null> {
    return await this.findOneBy({ id });
  }

  async deleteBoardById(id: number, userId: string): Promise<DeleteResult> {
    return await this.delete({
      id,
      user: {
        id: userId,
      },
    });
  }
}
