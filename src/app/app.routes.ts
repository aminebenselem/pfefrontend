import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './admin/admin-routes';
import { LoginComponent } from './login/login.component';
import { USER_ROUTES } from './user/user-routes';
import { HR_ROUTES } from './human-resources/hr-routes';

export const routes: Routes = [
    {path: 'admin', children: ADMIN_ROUTES},
    {path: 'hr', children: HR_ROUTES},
    {path: 'user', children: USER_ROUTES},
    {path: 'login',component:LoginComponent},

    {path:'',redirectTo:'/login',pathMatch:'full'},



];
