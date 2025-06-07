import { Component } from '@angular/core';
import { Game } from '../../models/game.model';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,SearchBarComponent,GameCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  games: Game[] = [];

  loading = true;
  constructor(private gameService: GameService) { }
  ngOnInit() {
    console.log('HomeComponent initialized');
    this.getData();
  }

  getData() {
    this.gameService.getGames().subscribe(data => {
      this.games = data;
      this.loading = false;
      console.log('Games loaded:', this.games);
    });
  }
  onSearch(query: string) {
    this.searchText = query;
  }

  onClear() {
    this.clearFilters();
  }
  searchText: string = '';
  minScore: number = 0;
  orderBy: string = 'releaseDate';

  filteredGames(): Game[] {
    let filtered = this.games;

    if (this.searchText) {
      filtered = filtered.filter(g =>
        g.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.minScore) {
      filtered = filtered.filter(g => parseFloat(g.rating) >= this.minScore);
    }

    if (this.orderBy === 'releaseDate') {
      filtered = filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (this.orderBy === 'rating') {
      filtered = filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (this.orderBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }

  clearFilters(): void {
    this.searchText = '';
    this.minScore = 0;
    this.orderBy = 'releaseDate';
  }


  // Add any methods or properties needed for the home component here
  // For example, you might want to fetch some data or handle user interactions

}
