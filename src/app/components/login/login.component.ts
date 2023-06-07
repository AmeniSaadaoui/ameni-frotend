import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: { username: string, password: string } = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    
  }

  login() {
    this.authService.login(this.model.username, this.model.password).subscribe(success => {
      if (success) {
        // Rediriger vers une page sécurisée après la connexion réussie
        this.router.navigate(['/secure-page']);
      } else {
        // Afficher un message d'erreur en cas d'échec de connexion
        console.log('Identifiants incorrects');
      }
    });
  }
}
