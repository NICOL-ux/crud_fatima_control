import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'profesora', password: 'profesora123', role: 'profesora' },
    { username: 'director', password: 'director123', role: 'director' },
  ];

  authenticate(username: string, password: string): string | null {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    return user ? user.role : null; 
  }
}

