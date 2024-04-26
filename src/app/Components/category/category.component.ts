import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../Models/icategory';
import { CatecoriesService } from '../../Services/catecories.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterLink, RouterLinkActive],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: ICategory = { entities: [], Count: 0 };
  textSearch: string = ''
  resultOfSearch: any | ICategory[];
  constructor(private _categoriesService: CatecoriesService, private router: Router , private dialog:MatDialog) { }
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: (error) => {
        alert('Please try again!');
      }
    });
  }

  
  deleteCategory(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this Category?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
    this._categoriesService.deleteCategory(id).subscribe({
      next: (respose) => {
        this.router.navigateByUrl('/Category');
        this.ngOnInit()
      },
      error: (error) => {
        console.log(error);

      }
    });
  }
});

}
updateCatecory(id:number){
  this.router.navigateByUrl(`/UpdateCategory/${id}`);
}
searchOfCategory()
{
  this._categoriesService.getCategoryByName(this.textSearch).subscribe((res:any)=>{
    this.resultOfSearch=res  
  })
}
addSpecification(id:number){
  this.router.navigateByUrl(`/AddSpecificationCategory/${id}`)
}
showSpecific(id:number)
{
  this.router.navigateByUrl(`/SpecificationCategory/${id}`)

}
}
