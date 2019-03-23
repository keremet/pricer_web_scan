import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseData } from '../api.types';
import { LoginData } from './auth.types';



const AUTH_STORAGE_KEY = 'auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedIn = false;
  private _loginData: LoginData;

  constructor(private http: HttpClient, 
              private storage: LocalStorageService) { }

  public initialize() {

    this._loggedIn = this.updateCredentials();
  }

  public login(login: string = '', password: string = ''): Promise<ApiResponseData> {
    login.trim(); password.trim();

    return new Promise<ApiResponseData>((resolve) => {
      
      if(!login || !password) {
        resolve({
          success: false,
          message: 'Заполните все поля'
        });
        return;
      }

      this.http.get<ApiResponseData>('https://api.pricer.versla.ru/auth/login', {
        params: {
          login: login,
          password: password,
        }
      }).subscribe(res => {
        
        if(res.success) {

          this._loginData = {
            login: login,
            password: password,
          };

          this.storage.writeData(AUTH_STORAGE_KEY, this._loginData);

        } else {
          this.storage.delete(AUTH_STORAGE_KEY);
          this._loginData = null;
        }

        this._loggedIn = res.success;
        resolve(res);
        
      }, res => {
        resolve(res.error);
      });

    });
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  get loginData(): LoginData {
    return this._loginData;
  }


  private updateCredentials(): boolean {
    
    if(!this.storage.exists(AUTH_STORAGE_KEY))
      return false;

    this._loginData = this.storage.readData(AUTH_STORAGE_KEY);

    return true;
  }

}
