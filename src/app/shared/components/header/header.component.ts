import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input()  nombre!:string;
  statusSidebar:boolean = true;
  sidebarService = inject(SidebarService)


  public effectSidebar(){
    this.statusSidebar = ! this.statusSidebar;
    this.sidebarService.largeSidebar(this.statusSidebar);
  }
}
