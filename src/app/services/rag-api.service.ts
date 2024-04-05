import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RagApiService {

  constructor(
    private httpClient: HttpClient
  ) {}

  apiKey = "e7ee9f2164b3ff17f74cb0ea6c016711";
  divineURL = "https://www.divine-pride.net/api/database";

  getMVP(id: string): Observable<any> {
    let queryParams = {
      id,
      apiKey: this.apiKey
    };
    return this.httpClient.get(`${this.divineURL}/Monster`, { params: queryParams });
  }

  getAllMVPS(idsArray: string[]) {
    let requestArray = new Array();
    idsArray.forEach(id => {
      requestArray.push(
        this.getMVP(id)
      )
    });
    return forkJoin(requestArray).pipe(
      switchMap(res => {
        let mvpArray = new Array();
        res.forEach(mvp => {
          mvpArray.push(this.parseMVPObject(mvp));
        })
        return of(mvpArray);
      })
    )
  }

  parseMVPObject(mvp: any) {
    return {
      id: mvp.id,
      name: mvp.name,
      spawn: mvp.spawn,
      spawnSet: mvp.spawnSet
    }
  }
}
