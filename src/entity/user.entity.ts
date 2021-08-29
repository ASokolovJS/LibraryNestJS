import { Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';


@Entity({name: 'users'})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  listBook: string 

  @Column({ default: false })
  subscription: boolean;

  constructor (name:string){
    super()
    this.name = name
    
  }
}