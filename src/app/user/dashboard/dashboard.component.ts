import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
username:any=localStorage.getItem('username')
getUserInitials(fullName: string): string {
if (!fullName) return '';

const parts = fullName.trim().split(' ').filter(part => part.length > 0);

if (parts.length === 1) {
  // Only one name -> take the first letter
  return parts[0].charAt(0).toUpperCase();
} else if (parts.length === 2) {
  // Two names -> take first letter of both
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
} else if (parts.length > 2) {
  // More than two -> first letter of first + first letter of last
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

return '';
}
}
