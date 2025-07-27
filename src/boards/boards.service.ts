import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];
    
    getAllBoards() : Board[]{
        return this.boards;
    }

    createBoard(createBoardDto : CreateBoardDto){
        const {title, description} = createBoardDto;
        const board : Board = {
            title,
            description,
            status : BoardStatus.PUBLIC,
            id : uuid()
        }
        this.boards.push(board);
        return board;
    }
}
