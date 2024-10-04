import { Component, inject, OnInit, signal } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CardService } from '../../services/card.service';
import { ICard } from '../../interfaces/ICard';
import { ToastrService } from 'ngx-toastr';

type UpdateCard = {
  value: boolean;
  customerId: number;
}

@Component({
  selector: 'app-cartes',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, MatSlideToggleModule],
  templateUrl: './cartes.component.html',
  styleUrl: './cartes.component.css'
})
export class CartesComponent implements OnInit{
  ngOnInit(): void {
    this.getCard();
  }

  cardService = inject(CardService);
  toastr = inject(ToastrService);

  newCardValues: UpdateCard = {
    value: false,
    customerId: 0
  }

  getCard(){
    this.cardService.getCard().subscribe({
      next: (res) => {
        this.cardService.card.set(res);
      },
      error: () => this.toastr.error("Erreur lors le chargement de la carte !", "Chargement de carte")
    })
  }

  setEnabled(value: boolean){
    this.newCardValues.value = !value;
    this.newCardValues.customerId = Number(localStorage.getItem("customerId"));
    this.cardService.setEnabled(this.newCardValues).subscribe({
      next: () => {
        this.newCardValues.value ? this.toastr.success("Carte bancaire activée avec succes", "Activation de carte")
        : this.toastr.warning("Carte bancaire désactivée avec succes", "Désactivation de carte");
        this.getCard();
      },
      error: () => this.toastr.error("Modification de carte pas possible pour le moment !", "Carte bancaire")
    })
    
  }

  setOnlinePayment(value: boolean){
    this.newCardValues.value = !value;
    this.newCardValues.customerId = Number(localStorage.getItem("customerId"));
    this.cardService.setOnlinePayment(this.newCardValues).subscribe({
      next: () => {
        this.newCardValues.value? this.toastr.success("Paiement en ligne activé avec succes", "Activation Paiement En ligne")
        : this.toastr.warning("Paiement en ligne désactivé avec succes", "Désactivation Paiement En ligne");
        this.getCard();
      },
      error: () => this.toastr.error("Modification de carte pas possible pour le moment !", "Carte bancaire")
    })
    
  }

  setByPass(value: boolean){
    this.newCardValues.value = !value;
    this.newCardValues.customerId = Number(localStorage.getItem("customerId"));
    this.cardService.setByPass(this.newCardValues).subscribe({
      next: () => {
        this.newCardValues.value ? this.toastr.success("ByPass activé avec succes !", "Activation ByPass")
        : this.toastr.warning("ByPAss désactivé avec succes !", "Désactivation ByPass");
        this.getCard();
      },
      error: () => this.toastr.error("Modification de carte pas possible pour le moment !", "Carte bancaire")
    })
    
  }

  setInternationalPayment(value: boolean){
    this.newCardValues.value = !value;
    this.newCardValues.customerId = Number(localStorage.getItem("customerId"));
    this.cardService.setInternationalPayment(this.newCardValues).subscribe({
      next: () => {
        this.newCardValues.value ? this.toastr.success("Paiement international activé avec succes !", "Activation Paiement International")
        : this.toastr.warning("Paiements internationals désactivé avec succes!", "Désactivation Paiement International");
        this.getCard();
      },
      error: () => this.toastr.error("Modification de carte pas possible pour le moment !", "Carte bancaire")
    })
    
  }

}
