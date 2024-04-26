import { Component, OnInit } from '@angular/core';
import { SpecificationService } from '../../Services/specification.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ISpecification } from '../../Models/ispecification';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-specifications',
  standalone: true,
  imports: [FormsModule , CommonModule , NgxPaginationModule],
  templateUrl: './specifications.component.html',
  styleUrl: './specifications.component.css'
})
export class SpecificationsComponent implements OnInit {
  specifications: ISpecification = { entities: [], count: 0 };
  textSearch: string = ''
  resultOfSearch: any | ISpecification[];
  pageItem:number=7; 
  pageNumber:number=1;
  totalCount:number =0 ;

  constructor(private _specificationService:SpecificationService , private router: Router , private dialog:MatDialog) { }
  ngOnInit(): void {
    this.getAllSpecifications();
  }
  getAllSpecifications() {
    this._specificationService.getAllSpecifications(this.pageItem , this.pageNumber).subscribe({
      next: (response: any) => {
        this.specifications = response;
        this.totalCount=response.count
      },
      error: (error) => {
       console.log(error);
       
      }
    });
  }

  
  deleteSpecific(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this Category?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
    this._specificationService.deleteSpecification(id).subscribe({
      next: (respose) => {
        this.router.navigateByUrl('/Specifications');
        this.ngOnInit()
      },
      error: (error) => {
        console.log(error);

      }
    });
  }
});

}

// searchOfSpecification()
// {
//   this._specificationService.(this.textSearch).subscribe((res:any)=>{
//     this.resultOfSearch=res
//   })
// }
onPageChange(pageNumber:number) {
  this.pageNumber = pageNumber;    
  this.getAllSpecifications()
}
}
