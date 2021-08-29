import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'userandsub'})
export class UserAndSub extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column({default: 1})
  subscriptionId: number

  constructor(userId:number, subscriptionId: number){
    super()
    this.userId = userId
    this.subscriptionId = subscriptionId
  }
}