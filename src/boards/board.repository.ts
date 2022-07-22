import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CustomRepository } from "./boards.decorator";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
}