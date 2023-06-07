import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map(response => {
          // Vérifier si la réponse contient un token JWT
          const token = response.token;
          if (token) {
            // Stocker le token dans le local storage
            localStorage.setItem('token', token);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    // Supprimer le token du local storage
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Vérifier si un token est présent dans le local storage
    return localStorage.getItem('token') !== null;
  }
}
