import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserCoursesComponent } from "./dashboard/user-courses/user-courses.component";
import { UserQcmsComponent } from "./dashboard/user-qcms/user-qcms.component";
import { MainContentComponent } from "./dashboard/main-content/main-content.component";
import { UserHistoryComponent } from "./dashboard/user-history/user-history.component";
import { CourseDetailsComponent } from "./dashboard/course-details/course-details.component";
import { QcmDetailsComponent } from "./dashboard/qcm-details/qcm-details.component";

export const USER_ROUTES: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: [
        { path: 'course/:id', component: CourseDetailsComponent },
        { path: 'qcm/:id', component: QcmDetailsComponent },
        { path: 'courses', component: UserCoursesComponent },
        { path: 'dashboard', component: MainContentComponent },
        { path: 'history', component: UserHistoryComponent },
        { path: 'exams', component: UserQcmsComponent },
        { path: '', redirectTo:'dashboard', pathMatch: 'full' }, // Default route
      ],
    },
  ];
  