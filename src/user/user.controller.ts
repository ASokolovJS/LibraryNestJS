import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Получение списка всех пользователей'})
  getListUser() {
    return this.userService.getListUser();
  }

  @Get('getInfo/:id')
  @ApiResponse({ 
    status: 200, 
    description: 'Получение информации(Имя, Список книг, Наличие абонемента) конкретного пользователя. Где id - id пользователя'
  })
  getInfo(@Param('id') id:number){
    return this.userService.getInfo(id)
  }

  @Get('getsubscription/:id')
  @ApiResponse({ 
    status: 200, 
    description: 'Получение абонемента, если его нет'
  })
  getSubscription(@Param('id') id:number){
    return this.userService.getSubscription(id)
  }

  @Get('findsub/:id')
  @ApiResponse({ 
    status: 200, 
    description: 'Проверка наличия абонемента'
  })
  findSubscription(@Param('id') id:number){
    return this.userService.findSubscription(id)
  }

  @Post('create')
  @ApiResponse({ 
    status: 200, 
    description: 'Добавление нового пользователя'
  })
  addUser(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.addUser(CreateUserDto)
  }

  @Delete('remove/:id')
  @ApiResponse({ 
    status: 200, 
    description: 'Удаление пользователя. Где id - id пользователя которого нужно удалить'
  })
  removeUser(@Param('id') id:number) {
    return this.userService.removeUser(id) 
  }

  @Put('edit/:id')
  @ApiResponse({ 
    status: 200, 
    description: 'Редактирование информации пользователя. Где id - id пользователя'
  })
  editUser(@Param('id') id:number, @Body() UpdateUserDto: UpdateUserDto) {
    return this.userService.editUser(id, UpdateUserDto) 
  }

}
