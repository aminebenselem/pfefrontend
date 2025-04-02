import { Component, OnInit } from '@angular/core';
import { MainContentComponent } from "../dashboard/main-content/main-content.component";
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  constructor(private router:Router){}
    ngOnInit(): void {
    
    }
  
}
