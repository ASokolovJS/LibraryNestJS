import { start } from "repl";
import { startWith } from "rxjs";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'userandbook'})
export class UserAndBook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  userId: number

  @Column()
  bookTitile: string

  constructor(userId:number, bookId:string){
    super()
    this.userId = userId
    this.bookTitile = bookId
  }
}