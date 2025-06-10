import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    private boards = ['1'];
    
    getAllBoards(){
        return this.boards;
    }
}
