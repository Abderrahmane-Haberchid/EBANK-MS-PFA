import { CustomerService } from './../../services/customer.service';
import { Component, Input, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    
  }
   @Input() title: string = '';

    customerService = inject(CustomerService);

}
