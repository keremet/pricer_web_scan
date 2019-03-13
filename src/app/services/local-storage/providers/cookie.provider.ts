import { LocalStorageProvider } from '../local-storage-provider';
import { Cookie } from 'ng2-cookies';

export class CookieProvider implements LocalStorageProvider {
    
    public writeObject(key: string, object: any) {
        Cookie.set(key, JSON.stringify(object));
    }    
    
    public readObject(key: string): any {
        return JSON.parse(Cookie.get(key));
    }

    public exists(key: string): boolean {
        return Cookie.check(key);
    }

    public delete(key: string) {
        Cookie.delete(key);
    }

    public clear() {
        Cookie.deleteAll();
    }

}