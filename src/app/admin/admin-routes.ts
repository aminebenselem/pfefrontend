import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainContentComponent } from "./dashboard/main-content/main-content.component";
import { AddUsersComponent } from "./dashboard/add-users/add-users.component";
import { AddQcmComponent } from "./dashboard/add-qcm/add-qcm.component";
import { AddCoursesComponent } from "./dashboard/add-courses/add-courses.component";

export const ADMIN_ROUTES: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: [
        { path: 'addcourses', component: AddCoursesComponent },
        { path: 'dashboard', component: MainContentComponent },
        { path: 'addusers', component: AddUsersComponent },
        { path: 'addQCMs', component: AddQcmComponent },
        { path: '', redirectTo:'dashboard', pathMatch: 'full' }, // Default route
      ],
    },
  ];
  