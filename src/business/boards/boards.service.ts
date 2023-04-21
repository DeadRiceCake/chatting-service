import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoard.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  public createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  public async getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }
}
