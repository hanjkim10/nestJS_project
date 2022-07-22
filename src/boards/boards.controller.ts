import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe, } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';


@Controller('boards')
export class BoardsController {
    constructor(private boadsService: BoardsService) { }

    @Get('/')
    getAllBoard(): Board[] {
        return this.boadsService.getAllBoards()
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: createBoardDto
    ): Board {
        return this.boadsService.createBoard(createBoardDto)
    }
    
    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boadsService.getBoardById(id)
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boadsService.deleteBoard(id)
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boadsService.updateBoardStatus(id, status)
    }
}