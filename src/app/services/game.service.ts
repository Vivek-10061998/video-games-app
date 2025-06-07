import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, delay } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://spa.api.logicloop.io/api/games';

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      delay(2000),
      map(response =>
        response.data.map((item: any) => ({
          id: item.id,
          name: item.attributes.name,
          summary: item.attributes.summary,
          rating: item.attributes.rating,
          publishedAt: item.attributes.publishedAt ? new Date(item.attributes.publishedAt) : null
        }))
      )
    );
  }
}
