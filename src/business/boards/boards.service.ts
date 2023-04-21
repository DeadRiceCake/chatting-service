import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BoardStatus } from './board.enum';
import { CreateBoardDto } from './dto/createBoard.dto';
import { UpdateBoardDto } from './dto/updateBoard.dto';
import { Board } from './board.entity';
import { REPOSITORY } from 'src/common/constant/repository.constants';

@Injectable()
export class BoardsService {
  constructor(
    @Inject(REPOSITORY.BOARD) private boardRepository: Repository<Board>,
  ) {}

  // public getAllBoards(): Board[] {
  //   return this.boards;
  // }

  public async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);

    return board;
  }

  public async getBoardById(id: number): Promise<Board> {
    const foundBoard = await this.boardRepository.findOneBy({ id });

    return foundBoard;
  }

  // public deleteBoard(id: string): void {
  //   const foundBoard = this.boards.find((board) => board.id === id);

  //   if (!foundBoard) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }

  //   this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
  // }

  // public updateBoardStatus(id: string, updateBoardDto: UpdateBoardDto): Board {
  //   const { status } = updateBoardDto;
  //   const board = this.getBoardById(id);
  //   board.status = status;

  //   return board;
  // }
}
