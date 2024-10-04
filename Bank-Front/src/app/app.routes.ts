
import { Routes } from '@angular/router';
import { OperationsComponent } from './pages/operations/operations.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { CartesComponent } from './pages/cartes/cartes.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'operations', component: OperationsComponent },
    { path: 'transactions', component: TransactionsComponent },
    { path: 'cartes', component: CartesComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'dashboard/:cin', component: DashboardComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: AddAccountComponent },
    { path: 'login', component: LoginComponent }
];
