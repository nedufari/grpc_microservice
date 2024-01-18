import { HttpException, HttpStatus, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Admin,CreateAdminDto,UpdateAdminDto,RemoveAdminDto,PaginationDto,FindAdminDto, Admins } from '@app/common';
import { randomInt, randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit{

  private readonly admins : Admin[] = []

  //nestjs wil call this anytime my app starts up
  onModuleInit() {

    //creatinf a dummy admin loop in place of an actual database 

    for (let i =0; 1 <=200; i++){
      this.create({username:randomUUID(),password:randomUUID(),age:randomInt(1,70)})

    }
    
  }


  create(createadminDto: CreateAdminDto):Admin {
    const admin: Admin ={
      ...createadminDto,
      subscribed:false,
      socialmedia:{twitteruri:"https://www.x.com/nedwrites",fburi:"https://www.facebook.com/profile?anolue_chinedu1"},
      id:randomUUID()
    }
    this.admins.push(admin);
    return admin
  }

  findAll():Admins {
    return { admins:this.admins}
  }

  findOne(id:string):Admin{
    const admin = this.admins.find((findadmin)=>findadmin.id ===id)
    return admin
  }

  update(id:string,updateAdminto: UpdateAdminDto) :Admin {
    const adminindex = this.admins.findIndex((findadmin)=>findadmin.id ===id)
    if (adminindex !== -1){
      this.admins[adminindex] ={
        ...this.admins[adminindex],
        ...updateAdminto,
      };
      return this.admins[adminindex]
    }

    throw new NotFoundException(`user with id${updateAdminto.id}not found`)

  }

  remove(id:string):Admin {
    const adminindex = this.admins.findIndex((findadmin)=>findadmin.id ===id)
    if (adminindex !== -1){
      return this.admins.splice(adminindex)[0]
    }

    throw new NotFoundException(`user with id${id}not found`)

  }

  //implementing the userquerystreams 
queryAdmins(paginationdtostream:Observable<PaginationDto>):Observable<Admins>{
  const subject = new Subject<Admins>(); 

  const onNext = (paginationdto:PaginationDto)=>{
    const start =paginationdto.page * paginationdto.skip;
    subject.next({
      admins: this.admins.slice(start,start+paginationdto.skip)
    })
  };

  const onComplete =() => subject.complete();
  paginationdtostream.subscribe({
    next:onNext,
    complete:onComplete
  });
  return subject.asObservable()
}



}
