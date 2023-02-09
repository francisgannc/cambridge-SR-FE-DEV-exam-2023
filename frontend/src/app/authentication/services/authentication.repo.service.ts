import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginDto } from 'src/app/shared/models/auth.models';

@Injectable()
export class AuthenticationRepoService {
  private api = '';

  constructor(private http: HttpClient) {}

  public login(loginDto: LoginDto): Observable<LoginDto> {
    return this.http
      .post<LoginDto>('http://localhost:3000/auth/login', {
        username: loginDto.username,
        email: loginDto.email,
      })
      .pipe(
        map((value) => {
          return value;
        })
      );
  }
}
