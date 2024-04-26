import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatecoriesService } from '../../Services/catecories.service';
import { ICategoryCreate } from '../../Models/icategory-create';
import { ISpecificationCreate } from '../../Models/ispecification-create';
import { ISpecification } from '../../Models/ispecification';
import { SpecificationService } from '../../Services/specification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ICategory } from '../../Models/icategory';
import { ICategoryResult } from '../../Models/icategory-result';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule , FormsModule , NgxPaginationModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit {
  newCategory: ICategoryCreate = { Category:{Id:0 , Name:''}, SpecificationsDtos: [] };
  newSpecification: ISpecificationCreate = { Id: 0, Name: '' };
  Specifications:ISpecification={entities:[{id:0 , name:'' , isSelected:false}] ,count:0 }
  pageItem:number=24 ;
  pageNumber=1;
  totalCount:number=0;
  CategoryId:number=0
  category:ICategoryResult={category:{id:0 , name:'' },specificationsDtos:[{id:0 , name:'' , isChecked:true}] }
  constructor(private _activeRoter:ActivatedRoute , 
    private _router:Router , 
    private _categoryService:CatecoriesService , 
    private _specificationService: SpecificationService ){
      
    }
    ngOnInit() {
      this.allSpecifications();
      this.CategoryId= Number(this._activeRoter.snapshot.paramMap.get('id'));
       this.getcategory()
       this.newCategory.Category.Id=this.CategoryId;
    }
  getcategory(){
    this._categoryService.getCategoryById(this.CategoryId).subscribe((result)=>{
      this.category=result;
      this.newCategory.Category.Name=result.category.name
      const selectedSpecs = result.specificationsDtos.filter(spec => spec.isChecked);
       selectedSpecs.forEach(selectedSpec => {
        this.newCategory.SpecificationsDtos.push({ Id: selectedSpec.id, Name: selectedSpec.name  });
      });
      this.newSpecification = { Id: 0, Name: '' };

     })
  }
    getIsChecked(id: number): boolean {
      const item = this.category.specificationsDtos.find(item => item.id === id);
      return item ? item.isChecked : false; 
    }
    UpdateCategory(){
     this._categoryService.updateCategory(this.newCategory).subscribe({
       next:(res)=>{
         this._router.navigateByUrl('/Categories') ;         
       } ,
       error:(err)=>{
          alert('Opps ! there is an error ,Please Try again')
       }
     })
    }
    allSpecifications(){
      this._specificationService.getAllSpecifications(this.pageItem , this.pageNumber).subscribe((result:any)=>{
       this.Specifications=result;
       this.totalCount=result.count;
      })
    }

    updateSpecification() {
    this.newCategory.SpecificationsDtos = [];
    const selectedSpecs = this.Specifications.entities.filter(spec => spec.isSelected);
    const result = this.category.specificationsDtos.filter(spec => spec.isChecked);

    selectedSpecs.forEach(selectedSpec => {
       result.forEach(res=>{
        this.newCategory.SpecificationsDtos.push({ Id: res.id , Name: res.name  });
       })
      this.newCategory.SpecificationsDtos.push({ Id: selectedSpec.id , Name: selectedSpec.name  });
    });
    this.newSpecification = { Id: 0, Name: '' };
    }

    
  
    onPageChange(pageNumber:number) {
      this.pageNumber = pageNumber;    
      this.allSpecifications()
    }
}
