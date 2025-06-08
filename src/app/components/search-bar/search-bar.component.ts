import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  searchQuery: string = '';

  constructor() { }
  nameInput: string = '';
  scoreInput: string = '';
  sortOption: string = 'firstReleaseDate'; // default sort
  @Output() filterChanged = new EventEmitter<{ name: string, score: string, sort: string }>();
  ngOnInit(): void {
  }


  applyFilter() {
    console.log('Applying filter with:', {
      name: this.nameInput,
      score: this.scoreInput,
      sort: this.sortOption
    });
    this.filterChanged.emit({
      name: this.nameInput,
      score: this.scoreInput,
      sort: this.sortOption
    });
  }
  clearFilter() {
    this.nameInput = '';
    this.scoreInput = '';
    this.sortOption = 'firstReleaseDate';
    this.applyFilter();
  }


}
