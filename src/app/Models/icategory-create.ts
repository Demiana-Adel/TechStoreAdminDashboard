import { ISpecificationCreate } from "./ispecification-create";

export interface ICategoryCreate {
    Category:{
    Id:number , 
    Name:string ,
   }
   SpecificationsDtos: ISpecificationCreate[];

}
