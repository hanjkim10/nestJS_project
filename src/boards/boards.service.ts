import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum'
import { v1 as uuid } from 'uuid'
import { createBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}
    // private boards: Board[] = []

    // getAllBoards(): Board[] {
    //     return this.boards
    // }

    // createBoard(createBoardDto: createBoardDto) {
    //     const title = createBoardDto.title
    //     const description = createBoardDto.description
    //     // const { title, description } = createBoardDto

    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board)
    //     return board
    // }
    
    async createBoard(createBoardDto: createBoardDto): Promise<Board> {
        const { title, description } = createBoardDto

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board)
        return board
    }

    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOneBy({id})

        if(!found) {
            throw new NotFoundException(`cannot find Board with id ${id}`)
        }
        return found
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id)

        if(result.affected === 0) {
            throw new NotFoundException(`Cannot find Board with id ${id}`)
        }

    }
    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id)

    //     if(!found) {
    //         throw new NotFoundException(`Cannot find Board with id ${id}`)
    //     }
    //     return found
    // }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id)
    //     this.boards = this.boards.filter((board) => board.id !== found.id)
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id)
    //     board.status = status
    //     return board
    // }
    
}
