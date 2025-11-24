import { Component, OnInit, inject } from '@angular/core';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './home-sidebar.component.html',
  styleUrl: './home-sidebar.component.css'
})
export class HomeSidebarComponent implements OnInit {
  status:boolean = true;
  nombre:string = 'Joel'
  sidebarService = inject(SidebarService)


  ngOnInit(): void {
    this.sidebarService.sidebarEffectButton$.subscribe(status =>{
      this.status = status
    })
  }
}
