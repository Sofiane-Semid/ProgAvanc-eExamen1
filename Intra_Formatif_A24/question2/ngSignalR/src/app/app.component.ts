import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatButtonModule]
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor(){
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

     // Réception : nombre d'utilisateurs connectés
    this.hubConnection.on('UpdateNbUsers', (nbUsers: number) => {
      this.nbUsers = nbUsers;
    });
     // Réception : prix de la pizza choisie
    this.hubConnection.on('UpdatePizzaPrice', (price: number) => {
      this.pizzaPrice = price;
    });
    
     this.hubConnection.on('UpdateNbPizzasAndMoney', (nbPizzas: number, money: number) => {
      this.nbPizzas = nbPizzas;
      this.money = money;
    });

    this.isConnected  =true
    
  }
   

  async selectChoice(selectedChoice:number) {
    this.selectedChoice = selectedChoice;
      if (this.hubConnection) {
      await this.hubConnection.invoke("SelectChoice", selectedChoice);
    }
  }

  unselectChoice() {
    this.selectedChoice = -1;
  }

  addMoney() {
  }

  buyPizza() {
  }
}
