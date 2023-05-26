import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardRepository } from './board.repository';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { BoardStatus } from './board.enum';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  public async getAllBoards(): Promise<ResponseBody> {
    return new ResponseBody('조회에 성공하였습니다.', {
      boards: await this.boardRepository.find(),
    });
  }

  public async createBoard(
    createBoardDto: CreateBoardDto,
  ): Promise<ResponseBody> {
    return new ResponseBody(
      '생성이 완료되었습니다.',
      await this.boardRepository.createBoard(createBoardDto),
    );
  }

  public async getBoardById(id: number): Promise<ResponseBody> {
    return new ResponseBody(
      '조회에 성공하였습니다.',
      await this.boardRepository.getBoardById(id),
    );
  }

  public async deleteBoardById(id: number): Promise<ResponseBody> {
    const deleteBoardResult = await this.boardRepository.delete(id);

    if (!deleteBoardResult.affected) {
      throw new NotFoundException(`${id}번 게시글이 존재하지 않습니다.`);
    }

    return new ResponseBody(`${id}번 게시글 삭제에 성공했습니다.`);
  }

  public async updateBoardStatusById(
    id: number,
    status: BoardStatus,
  ): Promise<ResponseBody> {
    const foundBoard = await this.boardRepository.getBoardById(id);

    foundBoard.status = status;

    return new ResponseBody(
      '수정에 성공하였습니다.',
      await this.boardRepository.save(foundBoard),
    );
  }
}
