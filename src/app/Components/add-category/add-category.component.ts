import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../Models/icategory';
import { CatecoriesService } from '../../Services/catecories.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICategoryCreate } from '../../Models/icategory-create';
import { ISpecificationCreate } from '../../Models/ispecification-create';
import { ISpecification } from '../../Models/ispecification';
import { SpecificationService } from '../../Services/specification.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule ,NgxPaginationModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  newCategory: ICategoryCreate = { Category:{Id:0 , Name:''}, SpecificationsDtos: [] };
  newSpecification: ISpecificationCreate = { Id: 0, Name: '' };
  Specifications:ISpecification={entities:[{id:0 , name:'' , isSelected:false}] ,count:0 }
  pageItem:number=24;
  pageNumber=1;
  totalCount:number=0;

  constructor(private _categoriesService:CatecoriesService , 
    private _specificationService:SpecificationService,
     private router:Router){
    
  }
  ngOnInit() {
    this.allSpecifications();
  }
  addNewCategory(){
   this._categoriesService.addCategory(this.newCategory).subscribe({
     next:(res)=>{
       this.router.navigateByUrl('/Categories') ;
     } ,
     error:(err)=>{
        alert('Opps ! there is an error ,Please Try again')
     }
   })
  }
  addSpecification() {
    this.newCategory.SpecificationsDtos = [];

  const selectedSpecs = this.Specifications.entities.filter(spec => spec.isSelected);

  selectedSpecs.forEach(selectedSpec => {
    this.newCategory.SpecificationsDtos.push({ Id: selectedSpec.id, Name: selectedSpec.name });
  });
  this.newSpecification = { Id: 0, Name: '' };
  }

  allSpecifications()
  {
    this._specificationService.getAllSpecifications(this.pageItem , this.pageNumber).subscribe((result:any)=>{
     this.Specifications=result;
     this.totalCount=result.count;
    })
  }
  onPageChange(pageNumber:number) {
    this.pageNumber = pageNumber;    
    this.allSpecifications()
  }
}
