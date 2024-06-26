import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../Models/iuser';
import { IUserCreate } from '../Models/iuser-create';

// Import environment configuration
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // Assign API URL from environment configuration
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

 
  getAllUsers(pageItem?:number , pageNumber?:number):Observable<IUser[]>
  {
      return this.httpClient.get<IUser[]>(`${this.apiUrl}User/GetAllUser?pageItem=${pageItem}&pageNumber=${pageNumber}`);
  }

  getUserById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.apiUrl}User/GetOneUser?Id=${id}`);
  }

  getUserByName(name: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.apiUrl}User/SearchUsersByName?Name=${name}`);
  }


  CreateUserAccount(newUser:FormData , RoleName:string):Observable<any>
  {
    return this.httpClient.post<any>(`${this.apiUrl}Account/CreateAccount?RoleName=${RoleName}`,newUser);
  }

  deleteAccount(userId: string): Observable<IUserCreate> {
    return this.httpClient.delete<IUserCreate>(`${this.apiUrl}Account/DeleteAccount?UserId=${userId}`);
  }
}                 

