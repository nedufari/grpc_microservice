/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "adminauth";

export interface PaginationDto {
  page: number;
  skip: number;
}

export interface CreateAdminDto {
  username: string;
  password: string;
  age: number;
}

export interface FindAdminDto {
  id: string;
}

export interface UpdateAdminDto {
  id: string;
  socialmedia: SocialMedia | undefined;
}

export interface RemoveAdminDto {
  id: string;
}

export interface Empty {
}

export interface Admins {
  admins: Admin[];
}

export interface Admin {
  id: string;
  username: string;
  password: string;
  age: number;
  subscribed: boolean;
  socialmedia: SocialMedia | undefined;
}

export interface SocialMedia {
  twitteruri: string;
  fburi: string;
}

export const ADMINAUTH_PACKAGE_NAME = "adminauth";

export interface AdminsServiceClient {
  createAdmin(request: CreateAdminDto): Observable<Admin>;

  findAllAdmin(request: Empty): Observable<Admins>;

  fndOneAdmin(request: FindAdminDto): Observable<Admin>;

  updateAdmin(request: UpdateAdminDto): Observable<Admin>;

  removeAdmin(request: RemoveAdminDto): Observable<Admin>;

  queryAdmins(request: Observable<PaginationDto>): Observable<Admins>;
}

export interface AdminsServiceController {
  createAdmin(request: CreateAdminDto): Promise<Admin> | Observable<Admin> | Admin;

  findAllAdmin(request: Empty): Promise<Admins> | Observable<Admins> | Admins;

  fndOneAdmin(request: FindAdminDto): Promise<Admin> | Observable<Admin> | Admin;

  updateAdmin(request: UpdateAdminDto): Promise<Admin> | Observable<Admin> | Admin;

  removeAdmin(request: RemoveAdminDto): Promise<Admin> | Observable<Admin> | Admin;

  queryAdmins(request: Observable<PaginationDto>): Observable<Admins>;
}

export function AdminsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createAdmin", "findAllAdmin", "fndOneAdmin", "updateAdmin", "removeAdmin"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AdminsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["queryAdmins"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AdminsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ADMINS_SERVICE_NAME = "AdminsService";
