import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './admin/admin-routes';
import { LoginComponent } from './login/login.component';
import { USER_ROUTES } from './user/user-routes';
import { HR_ROUTES } from './human-resources/hr-routes';
import { 
    AuthGuardService as AuthGuard 
  } from './services/auth-guard.service';
  import { 
    RoleGuardService as RoleGuard 
  } from './services/role-guard.service';
export const routes: Routes = [
    {path: 'admin', children: ADMIN_ROUTES ,canActivate:[AuthGuard,RoleGuard], 
        data: { 
          expectedRole: 'admin'
        } },
    {path: 'hr', children: HR_ROUTES ,canActivate:[AuthGuard,RoleGuard], 
        data: { 
          expectedRole: 'hr'
        } },
    {path: 'user', children: USER_ROUTES ,canActivate:[AuthGuard,RoleGuard], 
        data: { 
          expectedRole: 'user'
        } },
    {path: 'login',component:LoginComponent},

    {path:'',redirectTo:'/login',pathMatch:'full'},



];
