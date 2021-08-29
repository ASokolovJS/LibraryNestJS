import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import {CreateUserDto} from './dto/create-user.dto'
import { Repository } from 'typeorm';
import { User } from "../entity/user.entity";
import { UserAndBook } from '../entity/userAndBook.entity';
import { UserAndSub } from '../entity/userAndSub.entity';
import { UpdateUserDto} from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getListUser(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getSubscription(id:number){
    const sub = await UserAndSub.find()
    const result = (sub.map(i => i.userId)).includes(+id)
    if(result != true){
      new UserAndSub(id, 1).save()
      const user = await this.usersRepository.findOne(id)
      user.subscription = true
      this.usersRepository.save(user)
      return "Subscription Active"
    }else{
      return "You have subscription"
    }
  }

  async addUser(CreateUserDto: CreateUserDto) {
    const user = new User(CreateUserDto.name);
    await user.save()
    return "User is created"
  }

  async removeUser(id:number) {
    await this.usersRepository.delete(id)
    return "User is deleted"
  }

  async editUser(id:number, UpdateUserDto:UpdateUserDto) {
    const user = await this.usersRepository.findOne(id)
    user.name = UpdateUserDto.name
    this.usersRepository.save(user)
    return "The information has been updated"
  }

  async findSubscription(id: number){
    const user = await this.usersRepository.findOne(id)
    if(user != undefined){
      return user.subscription != true ? "No Subscription" : "You have subscription!"
    }else{
      return "The user was not found"
    }
  }

  async getInfo(id:number){
    const user = await this.usersRepository.findOne(id)
    const findlist = await UserAndBook.find()
    const listbook = (findlist.filter(p => p.userId == id)).map(i => i.bookTitile)

    return `Name: ${user.name}
            List Book: ${listbook.toString()}
            Subscription isActiv: ${user.subscription}`
  }
}
