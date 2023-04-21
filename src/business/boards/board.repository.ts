import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatus } from './board.enum';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);

    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const foundBoard = await this.findOneBy({ id });

    return foundBoard;
  }
}
