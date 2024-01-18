import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAdminDto, UpdateAdminDto } from '@app/common';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createadminDto: CreateAdminDto) {
    return this.usersService.create(createadminDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateadminDto: UpdateAdminDto) {
    return this.usersService.update(id, updateadminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('email-admins')
  emailadmins(){
    this.usersService.emailUsers()
  }
}
