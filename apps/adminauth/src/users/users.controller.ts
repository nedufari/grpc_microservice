import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Admins, AdminsServiceController, AdminsServiceControllerMethods, CreateAdminDto, Empty, FindAdminDto, PaginationDto, RemoveAdminDto, UpdateAdminDto } from '@app/common/types/adminauth';
import { Observable } from 'rxjs';

@Controller()
@AdminsServiceControllerMethods()
export class UsersController implements AdminsServiceController{
  constructor(private readonly usersService: UsersService) {}

  
  createAdmin( createadminDto: CreateAdminDto) {
    return this.usersService.create(createadminDto);
  }

  
  findAllAdmin(empty:Empty) {
    return this.usersService.findAll();
  }

  
  fndOneAdmin( findoneAdmindto: FindAdminDto) {
    return this.usersService.findOne(findoneAdmindto.id);
  }

  
  updateAdmin( updateAdmindto: UpdateAdminDto) {
    return this.usersService.update(updateAdmindto.id,updateAdmindto);
  }
 
 
  removeAdmin(removeadmindto:RemoveAdminDto) {
    return this.usersService.remove(removeadmindto.id);
  }

  queryAdmins(paginationDtostream: Observable<PaginationDto>){
    return this.usersService.queryAdmins(paginationDtostream)
    
  }
}
