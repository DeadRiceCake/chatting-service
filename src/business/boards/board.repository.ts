import { Injectable } from '@nestjs/common';
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatus } from './board.enum';
import { JwtPayload } from '../auth/jwt.payload';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: JwtPayload,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);

    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const foundBoard = await this.findOneBy({ id });

    return foundBoard;
  }

  async deleteBoardById(id: number): Promise<DeleteResult> {
    const deletedBoard = await this.delete(id);

    return deletedBoard;
  }
}
