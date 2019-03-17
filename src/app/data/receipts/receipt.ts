/**
 * Данные чека со сканированного QR-кода
 */

 /** Формат данных чека */
const REC_VERIFY: Object = {
    fn: '\\d+',
    fp: '\\d+',
    i: '\\d+',
    n: '\\d+',
    s: '\\d+\.\\d{2}',
    t: '\\d{8}T\\d{4}',
};
const REC_VERIFY_COUNT = 6;

export class ReceiptScan {
    private _blob: string;
    private _data: any = {};
    private _correct = false;
    
    constructor(blob: string) {
        if(!blob) return;
        this._blob = blob;

        let verify = Object.assign({}, REC_VERIFY);
        let i = 0;
        blob.split('&').forEach((v) => {
            let t = v.split('=');
            if(!verify.hasOwnProperty(t[0]) || !t[1].match(verify[t[0]])) {
                console.log(i);
                return;
            }
            i++;
            delete verify[t[0]];

            this._data[t[0]] = t[1];
        });
        if(i !== REC_VERIFY_COUNT)
            return;

        this._correct = true;
    }

    get correct() {
        return this._correct;
    }

    get date() {
        if(!this._correct) return null;

        let t: string[] = this._data.t.split('T');
        let date = t[0];
        let y = Number.parseInt(date.substr(0, 4));
        let m = Number.parseInt(date.substr(4, 2)) - 1;
        let d = Number.parseInt(date.substr(6, 2));
        let time = t[1];
        let h = Number.parseInt(time.substr(0, 2));
        let min = Number.parseInt(time.substr(2, 2));

        return new Date(y, m, d, h, min);
    }

    get price() {
        if(!this._correct) return null;

        return Number.parseFloat(this._data.s);
    }

    get itemCount() {
        if(!this._correct) return null;

        return Number.parseInt(this._data.n);
    }

    get blob() {
        return this._blob;
    }
}