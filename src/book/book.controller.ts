import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('Book')
@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('book')
  @ApiResponse({ status: 200, description: 'Получение списка всех книг'})
  getBook(){
    return this.bookService.getBook()
  }
  
  @Get('returnBook/:id/:titleBook')
  @ApiResponse({ status: 200, description: 'Возврат книги'})
  returnBook(@Param('id') id:number, @Param('titleBook') titleBook: string){
    return this.bookService.returnBook(id, titleBook)
  }

  @Post('addBook')
  @ApiResponse({ status: 200, description: 'Добавление книги в общий список'})
  addBook(@Body() CreateBookDto: CreateBookDto) {
    return this.bookService.addBook(CreateBookDto)
  }
  
  @Get('book/:id/:titleBook')
  @ApiResponse({ status: 200, description: 'Добавление книги в список конкретного пользователя. Где id - id пользователя, titlebook - название книги'})
  addBookForUser(@Param('id') id:number, @Param('titleBook') titleBook:string){
    return this.bookService.addBookForUser(id, titleBook)
  }
}
