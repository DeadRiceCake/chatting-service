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
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { BoardStatus } from './board.enum';
import { BoardStatusValidationPipe } from './pipes/boardStatusValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/getUser.decorator';
import { JwtPayload } from '../auth/jwt.payload';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('boards')
@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  public getAllBoards(@GetUser() user: JwtPayload): Promise<ResponseBody> {
    return this.boardsService.getAllBoards(user);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  public createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: JwtPayload,
  ): Promise<ResponseBody> {
    return this.boardsService.createBoard(createBoardDto, user);
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
    @GetUser() user: JwtPayload,
  ): Promise<ResponseBody> {
    return this.boardsService.deleteBoardById(id, user);
  }

  @Patch('/:id/status')
  public updateBoardStatusById(
    @Param('id', ParseIntPipe) id: number,
    @Body(BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<ResponseBody> {
    return this.boardsService.updateBoardStatusById(id, status);
  }
}
