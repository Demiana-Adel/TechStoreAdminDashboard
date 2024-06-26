import { Routes } from '@angular/router';
import { CategoryComponent } from './Components/category/category.component';
import { AddCategoryComponent } from './Components/add-category/add-category.component';
import { UpdateCategoryComponent } from './Components/update-category/update-category.component';
import { ProductComponent } from './Components/product/product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { OrderComponent } from './Components/order/order.component';
import { ReviewComponent } from './Components/review/review.component';
import { HomeComponent } from './Components/home/home.component';
import { UserComponent } from './Components/user/user.component';
import { CreateUserAccountComponent } from './Components/create-user-account/create-user-account.component';
import { LoginComponent } from './Components/login/login.component';
import { adminGuard } from './Guards/admin.guard';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AddSpecificationCategoryComponent } from './Components/add-specification-category/add-specification-category.component';
import { CategorySpecificationComponent } from './Components/category-specification/category-specification.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AddSpecificationComponent } from './Components/add-specification/add-specification.component';
import { SpecificationsComponent } from './Components/specifications/specifications.component';
import { OrderItemsComponent } from './Components/order-items/order-items.component';
import { UpdateOrderStatusComponent } from './Components/update-order-status/update-order-status.component';

export const routes: Routes = [
    {path:'' , redirectTo:'/Home' ,pathMatch:'full'},
    { path:'Home' , component:HomeComponent } ,
    { path:'Categories' , component:CategoryComponent ,canActivate:[adminGuard]} ,
    { path:'AddCategory' , component:AddCategoryComponent,canActivate:[adminGuard]} ,
    { path:'UpdateCategory/:id' , component:UpdateCategoryComponent,canActivate:[adminGuard]} ,
    { path:'Products' , component:ProductComponent,canActivate:[adminGuard]} ,
    { path:'AddProduct' , component:AddProductComponent,canActivate:[adminGuard]} ,   
    { path:'UpdateProduct/:id' , component:UpdateProductComponent,canActivate:[adminGuard]} ,
    { path:'Orders' , component:OrderComponent,canActivate:[adminGuard]} ,
    { path:'UpdateOrderStatus/:id' , component:UpdateOrderStatusComponent,canActivate:[adminGuard]} ,
    { path:'Reviews' , component:ReviewComponent,canActivate:[adminGuard]} ,
    { path:'Users' , component:UserComponent,canActivate:[adminGuard]} ,
    { path:'CreateUserAccount' , component:CreateUserAccountComponent,canActivate:[adminGuard]} ,
    { path:'AddSpecification' ,component:AddSpecificationComponent,canActivate:[adminGuard]} ,
    { path:'Specifications' ,component:SpecificationsComponent,canActivate:[adminGuard]} ,
    { path:'OrderItems/:id' ,component:OrderItemsComponent} ,
    { path:'ProductDetails/:id' ,component:ProductDetailsComponent} ,
    { path:'AddSpecificationCategory/:id' ,component:AddSpecificationCategoryComponent} ,
    { path:'SpecificationCategory/:id' ,component:CategorySpecificationComponent} ,
    { path:'Login' , component:LoginComponent} ,
];
