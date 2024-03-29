import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent implements OnInit {

  constructor(
    private input: MatInputModule,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
  }

  cardSearch(searchText: string): void {
    searchText = searchText.toLowerCase();
    this.cardService.filteredCard = this.cardService.cards.filter((card: Card) => {
      return card.title.toLowerCase().indexOf(searchText) > -1 || (card.name && card.name.toLowerCase().indexOf(searchText) > -1)
    });
  }
}
