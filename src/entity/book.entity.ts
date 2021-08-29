import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'books'})
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  bookId: number;

  @Column()
  title: string

  @Column()
  count: number

  constructor (title: string, count: number){
    super()
    this.title = title
    this.count = count

  }
}