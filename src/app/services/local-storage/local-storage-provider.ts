export interface LocalStorageProvider {
    
    writeObject(key: string, object: any);
    readObject(key: string): any;
    exists(key:string): boolean;
    delete(key: string);
    clear();
}