import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Game {
  id: number;
  name: string;
  summary: string;
  rating: number;
  releaseDate: string;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private apiUrl = 'https://spa.api.logicloop.io/api/games';

  constructor(private http: HttpClient) { }

  getGames(
    page: number,
    pageSize: number,
    nameFilter: string = '',
    minScore: number | null = null,
    sortBy: string = 'firstReleaseDate',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Observable<{ games: Game[], totalPages: number }> {

    let url = `${this.apiUrl}?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    if (nameFilter) {
      url += `&filters[name][$containsi]=${encodeURIComponent(nameFilter)}`;
    }

    if (minScore !== null) {
      url += `&filters[rating][$gte]=${minScore}`;
    }

    url += `&sort=${sortBy}:${sortOrder}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const games: Game[] = response.data.map((item: any) => {
          return {
            id: item.id,
            name: item.attributes.name,
            summary: item.attributes.summary,
            rating: Number(item.attributes.rating),
            releaseDate: new Date(item.attributes.firstReleaseDate).toLocaleDateString('en-GB') // DD/MM/YYYY
          };
        });

        const totalPages = response.meta.pagination.pageCount;
        return { games, totalPages };
      })

    );
  }



}

