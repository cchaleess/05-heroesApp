import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Auth } from 'src/app/heroes/interfaces/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;
 
  get auth(){
    return {...this._auth!};
  }
  constructor(private http: HttpClient) { }

  verificarToken(): Observable<boolean>{

    if(!localStorage.getItem('heroesApp')){
      return of(false); //Resuelve el observable
    }
    return this.http.get<Auth>(this.baseUrl + '/usuarios/' + localStorage.getItem('heroesApp'))
    .pipe(
      map(auth => {
        //console.log('auth map', auth);
        this._auth = auth;
        return true;
      })
    );
  }

  login(){
    return this.http.get<Auth>(this.baseUrl + '/usuarios/1')
    .pipe(
      tap(auth => this._auth = auth),
      tap(auth => localStorage.setItem('heroesApp', JSON.stringify(auth.id)))
    );
  }

  logout(){
    this._auth = undefined;
  }
}
