import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/createBoard.dto';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { BoardStatus } from './board.enum';
import { JwtPayload } from '../auth/jwt.payload';
import { REPOSITORY } from 'src/common/constant/repository.constants';
import { Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @Inject(REPOSITORY.BOARD) private boardRepository: Repository<Board>,
  ) {}

  public async getAllBoards(user: JwtPayload): Promise<ResponseBody> {
    return new ResponseBody('조회에 성공하였습니다.', {
      boards: await this.boardRepository
        .createQueryBuilder('board')
        .where('board.userId = :userId', { userId: user.id })
        .getMany(),
    });
  }

  public async createBoard(
    createBoardDto: CreateBoardDto,
    user: JwtPayload,
  ): Promise<ResponseBody> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.boardRepository.save(board);

    return new ResponseBody('생성이 완료되었습니다.', board);
  }

  public async getBoardById(id: number): Promise<ResponseBody> {
    return new ResponseBody(
      '조회에 성공하였습니다.',
      await this.boardRepository.findOneBy({ id }),
    );
  }

  public async deleteBoardById(
    id: number,
    user: JwtPayload,
  ): Promise<ResponseBody> {
    const deleteBoardResult = await this.boardRepository.delete({
      id,
      user,
    });

    if (!deleteBoardResult.affected) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`);
    }

    return new ResponseBody(`${id}번 게시글 삭제에 성공했습니다.`);
  }

  public async updateBoardStatusById(
    id: number,
    status: BoardStatus,
  ): Promise<ResponseBody> {
    const foundBoard = await this.boardRepository.findOneBy({ id });

    foundBoard.status = status;

    return new ResponseBody(
      '수정에 성공하였습니다.',
      await this.boardRepository.save(foundBoard),
    );
  }
}
