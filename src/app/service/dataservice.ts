import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../api/product';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }

    getData(entityName:string) {
        return this.http.get<any>('assets/demo/data/' + entityName + '.json')
        .toPromise()
        .then(res => res.data)
        .then(data => data);
    }



}
