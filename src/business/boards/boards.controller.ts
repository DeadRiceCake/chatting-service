import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { UpdateBoardDto } from './dto/updateBoard.dto';
import { BoardStatusValidationPipe } from './pipes/boardStatusValidation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // @Get('/')
  // public getAllBoards() {
  //   return this.boardsService.getAllBoards();
  // }

  @Post('/')
  @UsePipes(ValidationPipe)
  public createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  public getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // @Delete('/:id')
  // public deleteBoard(@Param('id') id: string) {
  //   return this.boardsService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // public updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body(new BoardStatusValidationPipe()) updateBoardDto: UpdateBoardDto,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, updateBoardDto);
  // }
}
