import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { BoardStatus } from './board.enum';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

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

  @Put('/:id')
  public updateBoardStatusById(
    @Param('id') id: number,
    @Body('status') status: BoardStatus,
  ): Promise<ResponseBody> {
    return this.boardsService.updateBoardStatusById(id, status);
  }
}
