import { Component, OnInit } from '@angular/core';
import { SpecificationService } from '../../Services/specification.service';
import { ISpecificationCreate } from '../../Models/ispecification-create';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-specification',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-specification.component.html',
  styleUrl: './add-specification.component.css'
})
export class AddSpecificationComponent  {
  newSpecific:ISpecificationCreate={Id:0 ,Name:''}
constructor(private _specificationService:SpecificationService , private router:Router){}

addNewSpecific()
{
  this._specificationService.addSpecification(this.newSpecific).subscribe({
  next:(response)=>{
    
    this.newSpecific=response
    this.router.navigateByUrl('/Specifications');

  } , 
  error:(err)=>{
    console.log(err);
    
  }
  });
}
}
