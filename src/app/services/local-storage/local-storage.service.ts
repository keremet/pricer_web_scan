import { Injectable } from '@angular/core';
import { LocalStorageProvider } from './local-storage-provider';
import { CookieProvider } from './providers/cookie.provider';
import { LocalStorageApiProvider } from './providers/local-storage-api.provider';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: LocalStorageProvider;

  constructor() { 
    // For now we will use browser features only
    this.storage = localStorage ? new LocalStorageApiProvider() 
                                : new CookieProvider();
  }

  public writeData(key: string, data: any) {
    
    this.storage.writeObject(key, data);
  }

  public readData(key: string): any {
    
    return this.storage.readObject(key);
  }

  public exists(key: string): boolean {
    
    return this.storage.exists(key);
  }

  public delete(key: string) {
    this.storage.delete(key);
  }

  public clear() {
    this.storage.clear();
  }

}
