import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ICustomer } from '../../interfaces/ICustomer';
import { ICurrentAccount } from '../../interfaces/ICurrentAccount';
import { ISavingAccount } from '../../interfaces/ISavingAccount';
import { ICard } from '../../interfaces/ICard';

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css'
})
export class AddAccountComponent {

  service = inject(CustomerService);
  toastr = inject(ToastrService);
  router = inject(Router);

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    adresse: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required)
  })

  currentAccountForm = new FormGroup({
    balance: new FormControl('', Validators.required),
    decouvert: new FormControl('', Validators.required)
  })
  savingAccountForm = new FormGroup({
    balance: new FormControl('', Validators.required),
    interestRate: new FormControl('', Validators.required)
  })


  step: string = 'one';

  // customer Object
  customer : ICustomer ={
    customerId: null,
    name: '',
    email: '',
    adresse: '',
    cin: '',
    created_at: null,
  }
  // current Account Object
  currentAccount = signal<ICurrentAccount>({
    account_id: '',
    balance: null,
    created_at: null,
    status: 'CREATED',
    decouvert: null,
    customer_id: null
  })
  // saving Account Object
  savingAccount = signal<ISavingAccount>({
    account_id: '',
    balance: null,
    created_at: null,
    status: 'CREATED',
    interestRate: null,
    customer_id: null
  })
  card = signal<ICard>({
    isEnabled: true,
    onlinePayment: false,
    internationalPayment: false,
    bypasse: false,
    createdAt: null,
    expirationDate: null,
    customerId: null
  })

  creerMembre(){
    this.step = "two";
  }
  creerCompteCourant(){
    this.step = "three";
  }
  creerCompteEpargne(){
    this.step = "recap";
  }

  create(){

    //Creation du profile de client
    this.createCustomer();

    setTimeout(() => {
      // creation du compte courant
     this.createCurrentAccount();
    }, 3000);

    setTimeout(() => {
     // Creation du compte epargne
      this.createSavingAccount();
    }, 4000);

    setTimeout(() => {
      // Creation du de la carte bancaire
       this.createCard();
     }, 6000);

    setTimeout(() => {
      this.router.navigate(["/home"]);
    }, 7000);
  }

  createCustomer(){

    // creation du client
    this.service.creerCustomer(this.customer).subscribe({
      next: (res) => {
        this.toastr.success("Membre crée avec success !", "Profile client");
        this.savingAccount.update(account => ({...account, customer_id: res.customerId}));

        localStorage.setItem("customerId", res.customerId);
                          
      },
      error: (err) => {
        err.status !== 200 && this.toastr.error("Une erreur s'est produite ! "+err.status, "Erreur")
      }
    });
  }

  createCurrentAccount(){
    this.currentAccount.update(account => ({...account, customer_id: Number(localStorage.getItem("customerId")) }));

    this.service.creerCurrentAccount(this.currentAccount()).subscribe({
      next: () => {
              this.toastr.success("Compte Courant crée avec succes !", "Compte courant");
            },
      error: (err) => this.toastr.error("Pas possible de créer ce compte courant "+err, "Erreur")
    });
  }
  createSavingAccount(){
    this.savingAccount.update(account => ({...account, customer_id: Number(localStorage.getItem("customerId")) }));

    this.service.creerSavingAccount(this.savingAccount()).subscribe({
      next: () => {
        this.toastr.success("Compte Epargne crée avec succes !", "Compte éparne");
      },
      error: (err) => this.toastr.error("Pas possible de créer ce compte épargne "+err, "Erreur")
    })
  }

  createCard(){
    this.card.update((c) => ({...c, customerId: Number(localStorage.getItem("customerId"))}));

    this.service.creerCard(this.card()).subscribe({
      next: () => this.toastr.success("Carte bancaire crée avec succes !", "Carte bancaire"),
      error: () => this.toastr.error("Erreur lors la création de la carte Bancaire", "Carte bancaire")
    })
  }

  backBtnToFirst(){
    this.step = 'one';
  }
  backBtnToTwo(){
    this.step = 'two';
  }
  backBtnToThree(){
    this.step = 'three';
  }
}
