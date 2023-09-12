import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoard.dto';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { BoardStatus } from './board.type';
import { JwtPayload } from '../users/jwt.payload';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  public async getAllBoards(user: JwtPayload): Promise<ResponseBody> {
    return new ResponseBody('조회에 성공하였습니다.', {
      boards: await this.boardRepository.getAllBoards(user.id),
    });
  }

  public async createBoard(
    createBoardDto: CreateBoardDto,
    user: JwtPayload,
  ): Promise<ResponseBody> {
    const { title, description } = createBoardDto;

    const board = await this.boardRepository.createBoard(
      title,
      description,
      user.id,
    );

    return new ResponseBody('생성이 완료되었습니다.', board);
  }

  public async getBoardById(id: number): Promise<ResponseBody> {
    const board = await this.boardRepository.getBoardById(id);

    if (!board) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`);
    }

    return new ResponseBody('조회에 성공하였습니다.', board);
  }

  public async deleteBoardById(
    id: number,
    user: JwtPayload,
  ): Promise<ResponseBody> {
    const deleteBoardResult = await this.boardRepository.deleteBoardById(
      id,
      user.id,
    );

    if (!deleteBoardResult.affected) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`);
    }

    return new ResponseBody(`${id}번 게시글 삭제에 성공했습니다.`);
  }

  public async updateBoardStatusById(
    id: number,
    status: BoardStatus,
  ): Promise<ResponseBody> {
    const foundBoard = await this.boardRepository.getBoardById(id);

    if (!foundBoard) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`);
    }

    foundBoard.status = status;

    const updateResult = await this.boardRepository.save(foundBoard);

    return new ResponseBody('수정에 성공하였습니다.', updateResult);
  }
}
