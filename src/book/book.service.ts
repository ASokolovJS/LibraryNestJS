import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { UserAndBook } from '../entity/userAndBook.entity';
import { CreateBookDto } from './dto/create-book.dto'


@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async getBook(){
    return this.booksRepository.find()
  }

  async addBook(CreateBookDto:CreateBookDto) {
    await new Book(CreateBookDto.title, CreateBookDto.count).save()
    return "A new book has been added"
  }

  async addBookForUser(id:number, titleBook:string) {
    const countBook = await UserAndBook.find()
    const result = countBook.filter(p => p.userId == id)
    
    if(result.length < 5){
      const user = await User.findOne(id)
      const books = await this.booksRepository.find()
      const book = books.find(p => p.title == titleBook)

      if(user.subscription === true){    
        if(book.count != 0){
          await new UserAndBook(user.id, book.title).save()
          book.count = book.count-1
          await this.booksRepository.save(book)
        }else{
          return "This book is not available"
        }
      }else{
        return "You need to buy a subscription"
      }
    }else{
      return "You can't take more than 5 books"
    }
  }

  async returnBook(id: number, titleBook: string){
    const listbooks = await UserAndBook.find()
    const result = listbooks.findIndex(p => p.bookTitile == titleBook)
    
    if(result != -1 && listbooks[result].userId == id){
      const idx = listbooks[result].id
      await UserAndBook.delete(idx)
      const books = await this.booksRepository.find()
      const book = books.find(p => p.title == titleBook)
      book.count = book.count+1
      await this.booksRepository.save(book)
      return "The return was successful"
    }else{
      return "You don't have this book" 
    }
  }
}
