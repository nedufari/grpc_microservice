import { ADMINS_SERVICE_NAME, AdminsServiceClient, CreateAdminDto, Empty, FindAdminDto, PaginationDto, UpdateAdminDto } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';


@Injectable()
export class UsersService implements OnModuleInit {

  private adminserivce:AdminsServiceClient;

  constructor(@Inject(AUTH_SERVICE)private client:ClientGrpc){}

  onModuleInit() {
    
    this.adminserivce =
    this.client.getService<AdminsServiceClient>(ADMINS_SERVICE_NAME)
  }


  create(createAdminDto: CreateAdminDto) {
    return this.adminserivce.createAdmin(createAdminDto)
  }

  findAll(empty:Empty) {
    return this.adminserivce.findAllAdmin(empty)
  }

  findOne(id: string) {
    return this.adminserivce.fndOneAdmin({id})
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminserivce.updateAdmin({id, ...updateAdminDto})
  }

  remove(id: string) {
    return this.adminserivce.removeAdmin({id})
  }


  //this method will query the userservice to know the amount of users they have and then call them in chunks so we dont over load the users with too many data, so the chunks wwere broken into 
  emailUsers(){
    const admins$ = new ReplaySubject<PaginationDto> ();

    admins$.next({page:0, skip:50});
    admins$.next({page:1, skip:50});
    admins$.next({page:2, skip:50});
    admins$.next({page:3, skip:50});

    admins$.complete();

    let chunkNumber = 1;

    this.adminserivce.queryAdmins(admins$).subscribe(admins=>{
      console.log('chunk',chunkNumber);
      chunkNumber += 1 
    })

  }
}
