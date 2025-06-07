import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  searchQuery: string = '';
@Output() search = new EventEmitter<string>();
@Output() clear = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    // Initialization logic if needed
  }


onSearch(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.search.emit(value);
}

onClear() {
  this.clear.emit();
}


}
