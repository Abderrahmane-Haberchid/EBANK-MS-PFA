import { CustomerService } from './../../services/customer.service';
import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  ngOnInit(): void {
    this.getCustomer();
  }

  customerService = inject(CustomerService);
  currentAccount: string|null = localStorage.getItem("currentAccountId");
  savingAccount: string|null = localStorage.getItem("savingAccountId");
  cin: string|null = localStorage.getItem("customerCin");

  getCustomer(){
    this.customerService.findUserByCIN(this.cin).subscribe({
      next: (res) => this.customerService.customer.set(res),
      error: () => {}
    })
  }
}
