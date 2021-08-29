import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'subscription'})
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  subId: number

  @Column()
  name: string

  constructor(name: string){
    super()
    this.name = name
  }
}