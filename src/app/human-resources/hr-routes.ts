import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainContentComponent } from "./dashboard/main-content/main-content.component";
import { HrUsersComponent } from "./dashboard/hr-users/hr-users.component";


export const HR_ROUTES: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: [
        { path: 'dashboard', component: MainContentComponent },
        { path: 'users', component: HrUsersComponent },
        { path: '', redirectTo:'dashboard', pathMatch: 'full' }, // Default route
      ],
    },
  ];
  