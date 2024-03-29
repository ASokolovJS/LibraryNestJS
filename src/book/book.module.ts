import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from '../book/book.controller';
import { BookService } from '../book/book.service';
import { Book } from '../entity/book.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookrModule {}
