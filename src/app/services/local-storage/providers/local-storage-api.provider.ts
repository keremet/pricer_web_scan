import { LocalStorageProvider } from '../local-storage-provider';

export class LocalStorageApiProvider implements LocalStorageProvider {
    
    public writeObject(key: string, object: any) {
        localStorage.setItem(key, JSON.stringify(object));
    }    
    
    public readObject(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    public exists(key: string): boolean {
        return localStorage.getItem(key) ? true : false;
    }

    public delete(key: string) {
        localStorage.removeItem(key);
    }

    public clear() {
        localStorage.clear();
    }

}