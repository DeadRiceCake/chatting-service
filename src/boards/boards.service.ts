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
    return new ResponseBody({
      data: {
        boards: await this.boardRepository.getAllBoards(user.id),
      },
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

    return new ResponseBody({ data: board });
  }

  public async getBoardById(id: number): Promise<ResponseBody> {
    const board = await this.boardRepository.getBoardById(id);

    if (!board) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`);
    }

    return new ResponseBody({ data: board });
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

    return new ResponseBody();
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

    return new ResponseBody({ data: updateResult });
  }
}
