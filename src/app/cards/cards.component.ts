import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardModalComponent } from './card-modal/card-modal.component';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  cards!:Card[];
  cardItem={
    title:'Bilgisayar Mühendisi',
    name:'Bedran Özcan',
    phone:'0555 555 55',
    email:'bedran.ozcan@idvlabs.com',
    address:'Ankara,Yenimahalle'
  }
  constructor(
    public dialog:MatDialog,
    private cardService:CardService
  ) { }

  ngOnInit(): void {
    this.getCard();
  }

  
  openAddCardModel(): void{
    this.dialog.open(CardModalComponent,{
      width:'400px'
    });
  }

  getCard(){
    this.cardService.getCard()
    .subscribe((res:Card[])=>{
      console.log(res);
      this.cards=res;
    })
  }
}
