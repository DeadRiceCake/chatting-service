import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { BoardStatus } from './board.enum';
import { BoardStatusValidationPipe } from './pipes/boardStatusValidation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  public getAllBoards(): Promise<ResponseBody> {
    return this.boardsService.getAllBoards();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  public createBoard(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<ResponseBody> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  public getBoardById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseBody> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  public deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseBody> {
    return this.boardsService.deleteBoardById(id);
  }

  @Patch('/:id/status')
  public updateBoardStatusById(
    @Param('id', ParseIntPipe) id: number,
    @Body(BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<ResponseBody> {
    return this.boardsService.updateBoardStatusById(id, status);
  }
}
