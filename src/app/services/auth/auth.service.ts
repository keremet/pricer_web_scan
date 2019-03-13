import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



const AUTH_STORAGE_KEY = 'auth';

interface AuthData {
  login: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedIn = false;
  private _authData: AuthData;

  constructor(private http: HttpClient, 
              private storage: LocalStorageService) { }

  public initialize() {

    this._loggedIn = this.updateCredentials();
  }

  public login(login: string, password: string): Promise<boolean> {

    return new Promise<boolean>((resolve) => {
      
      new Observable<{success: boolean}>( s => {
        // HTTP Request
        s.next({success: login == 'demo' && password == 'demo'});

      } ).subscribe(res => {
        
        if(res.success) {

          this._authData = {
            login: login,
            password: password,
          };

          this.storage.writeData(AUTH_STORAGE_KEY, this._authData);

        } else {
          this.storage.delete(AUTH_STORAGE_KEY);
          this._authData = null;
        }

        this._loggedIn = res.success;
        resolve(res.success);
        
      });

    });
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }




  private updateCredentials(): boolean {
    
    if(!this.storage.exists(AUTH_STORAGE_KEY))
      return false;

    this._authData = this.storage.readData(AUTH_STORAGE_KEY);

    return true;
  }

}
