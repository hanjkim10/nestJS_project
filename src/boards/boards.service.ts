import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum'
import { createBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}
    
    async createBoard(createBoardDto: createBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoardDto

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user,
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

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({ id })

        if(result.affected === 0) {
            throw new NotFoundException(`Cannot find Board with id ${id}`)
        }

    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = this.getBoardById(id)

        ;(await board).status = status
        await this.boardRepository.save

        return board

    }

    async getAllBoards(
        user: User
    ): Promise <Board[]> {
        const query = this.boardRepository.createQueryBuilder('board')
        
        query.where('board.userId = :userId', {userId: user.id})

        const boards = await query.getMany()

        return boards
    }

}
