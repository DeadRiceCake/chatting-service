import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { ResponseBody } from 'src/common/class/responseBody.class';

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
}
