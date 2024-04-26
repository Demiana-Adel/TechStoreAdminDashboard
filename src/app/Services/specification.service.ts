import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpecificationCreate } from '../Models/ispecification-create';
import { environment } from '../../environment';
import { ISpecification } from '../Models/ispecification';

@Injectable({
  providedIn: 'root'
})
export class SpecificationService {
  apiUrl = environment.apiUrl;

  constructor(private _httpClient:HttpClient) { }

addSpecification(newSpecific:ISpecificationCreate):Observable<ISpecificationCreate>
{
  return this._httpClient.post<ISpecificationCreate>(`${this.apiUrl}specification` , newSpecific) ;
}
getAllSpecifications(pageItem:number , pageNumber:number):Observable<ISpecification>
{
  return this._httpClient.get<ISpecification>(`${this.apiUrl}specification?ItemsPerPage=${pageItem}&PageNumber=${pageNumber}`);

}
deleteSpecification(id:number):Observable<ISpecification>
{
  return this._httpClient.delete<ISpecification>(`${this.apiUrl}specification?id=${id}`);
}

}
