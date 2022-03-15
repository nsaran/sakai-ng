import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../api/product';

@Injectable()
export class MetaService {

    constructor(private http: HttpClient) { }

    getEntities() {
        return this.http.get<any>('assets/demo/data/entities.json')
        .toPromise()
        .then(res => res.data)
        .then(data => data);
    }
    
    getColumnDetailsForEntity(entityName: string) {
        return this.http.get<any>('assets/demo/data/metadata.json')
        .toPromise()
        .then(res => res.data)
        .then(data => data);
    }

}
