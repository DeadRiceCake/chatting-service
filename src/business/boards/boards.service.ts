import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoard.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { ResponseBody } from 'src/common/class/responseBody.class';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  public createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  public getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  public async deleteBoardById(id: number): Promise<ResponseBody> {
    const deleteBoardResult = await this.boardRepository.delete(id);

    if (!deleteBoardResult.affected) {
      throw new NotFoundException(`${id}번 게시글이 존재하지 않습니다.`);
    }

    return new ResponseBody(`${id}번 게시글 삭제에 성공했습니다.`);
  }
}
