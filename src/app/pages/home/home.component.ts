import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Game, GameService } from '../../services/game.service';

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SearchBarComponent, GameCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  games: Game[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 5;
  nameFilter: string = '';
  minScore: number | null = null;
  sortBy: string = 'firstReleaseDate';
  sortOrder: 'desc' | 'asc' = 'desc';
  pageSize = 4;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.loadGames();
  }


  loadGames() {
    this.loading = true;

    this.gameService
      .getGames(this.currentPage, this.pageSize, this.nameFilter, this.minScore, this.sortBy, this.sortOrder)
      .subscribe({
        next: (result) => {
          this.games = result.games;
          this.totalPages = result.totalPages;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  onFilterChanged(filterData: { name: string; score: string; sort: string }) {
    this.nameFilter = filterData.name;
    this.minScore = filterData.score ? Number(filterData.score) : null;
    this.sortBy = filterData.sort || 'firstReleaseDate';
    this.sortOrder = 'desc'; // or bind from UI if needed
    this.currentPage = 1;

    this.loadGames();
  }


  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadGames();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadGames();
    }
  }
}

