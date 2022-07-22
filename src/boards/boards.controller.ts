import { Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe, } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';


@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardService.getAllBoards()
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: createBoardDto
    // ): Board {
    //     return this.boardService.createBoard(createBoardDto)
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: createBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto)
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id)
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
        return this.boardsService.deleteBoard(id)
    }
    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardService.getBoardById(id)
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardService.deleteBoard(id)
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ) {
    //     return this.boardService.updateBoardStatus(id, status)
    // }
}