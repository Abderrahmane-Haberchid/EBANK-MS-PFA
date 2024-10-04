import { CustomerService } from '../../services/customer.service';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  customerCin = localStorage.getItem('customerCin');
  accountService = inject(AccountService);
  customerService = inject(CustomerService);

  quite(){
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    });
  }
}
