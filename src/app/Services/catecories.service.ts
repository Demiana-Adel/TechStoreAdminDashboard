import { Injectable } from '@angular/core';
import { ICategory } from '../Models/icategory';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ISpecification } from '../Models/ispecification';
import { ICategoryCreate } from '../Models/icategory-create';
import { environment } from '../../environment';
import { IReturnedData } from '../Models/ireturned-data';
import { ISpecificCategory } from '../Models/ispecific-category';
import { ISpecificCreateCategory } from '../Models/ispecific-create-category';
import { ICategoryResult } from '../Models/icategory-result';


@Injectable({
  providedIn: 'root'
})
export class CatecoriesService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }
  getAllCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${this.apiUrl}Category`);
  }

  getCategoryById(id: number): Observable<ICategoryResult> {
    return this.httpClient.get<ICategoryResult>(`${this.apiUrl}Category/${id}`);
  }

  getCategoryByName(name: string): Observable<ICategory> {
    return this.httpClient.get<ICategory>(`${this.apiUrl}Category/SearchCategoriesByName?Name=${name}`);
  }
  
  addCategory(newCategory: ICategoryCreate): Observable<ICategoryCreate> {
    return this.httpClient.post<ICategoryCreate>(`${this.apiUrl}Category`, newCategory);
  }
  getCategorySpecific(id:number):Observable<ISpecificCategory[]>{
   return this.httpClient.get<ISpecificCategory[]>(`${this.apiUrl}Category/GetSpecficationsByCategoryId?CategoryId=${id}`)
  }
 
  
  updateCategory(newCategory: ICategoryCreate): Observable<ICategory> {
    // const httpOptions={
    //   Headers:new HttpHeaders({
    //     'Content-Type': 'application/json' 
    //   })
    // }
    return this.httpClient.put<ICategory>(`${this.apiUrl}Category`,newCategory );
  }

  deleteCategory(categoryId: number): Observable<ICategory> {
    return this.httpClient.delete<ICategory>(`${this.apiUrl}Category/DeleteCategory?id=${categoryId}`);
  }
  deleteSpecification(catId:number , specificId:number):Observable<ISpecificCategory>
  {
   return this.httpClient.delete<ISpecificCategory>(`${this.apiUrl}Category/DeleteSpec?CategoryId=${catId}&SpecID=${specificId}`)
  }
  addSpecificationToCategory(id:number ,newSpecfication:ISpecificCreateCategory):Observable<IReturnedData[]>{
    return this.httpClient.post<IReturnedData[]>(`${this.apiUrl}Category/CreateSpec?CategoryId=${id}`, newSpecfication);
  }
}
