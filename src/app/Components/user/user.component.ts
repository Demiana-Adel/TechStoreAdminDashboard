import { Component, OnInit } from '@angular/core';
import { IUser } from '../../Models/iuser';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule , NgxPaginationModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  searchText: string = ''
  errorMessages: string = '';

  searchResult: any | IUser[];
  Users: IUser = { entities: [], Count: 0 };
  constructor(private _userService: UserService, private router: Router ,private dialog: MatDialog) { }

  pageItem:number=4;
  pageNumber:number=1 ;
  totalCount:number=0
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(): void {
    this._userService.getAllUsers(this.pageItem , this.pageNumber).subscribe({
      next: (response: any) => {
        this.Users = response;
        this.totalCount=response.count;
        
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        alert('An error occurred while fetching users. Please try again!');
      }
    });
  }


deleteAccount(userId: string) {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '250px',
    data: 'Are you sure you want to delete this account?'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this._userService.deleteAccount(userId).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/Users');
          this.ngOnInit();
          this.errorMessages = `Delete User successfully: ${response}`;

        },
        error: (error) => {
          this.errorMessages =`Error occurred during account deletion:${error}`;

          console.log("Error occurred during account deletion:", error);
        }
      });
    }
  });
}  

  searchByName() {
    this._userService.getUserByName(this.searchText).subscribe((result) => {
      this.searchResult = result.entities;
      this.totalCount=result.Count;
    });
  }
  
  onPageChange(pageNumber:number) {
    this.pageNumber = pageNumber;
    console.log(pageNumber);
    
    this.getAllUsers()
  }
}
