
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { Observable } from 'rxjs';

@Injectable()
export class MetaService {
    
    constructor(private http: HttpClient) { }
    getEntities() {
        return this.http.get<any>('assets/demo/data/entities.json')
        .toPromise()
        .then(res => res.data)
        .then(data => data);
    }
    
    getColumnList(entityName: string) {
        let cols = [];
        this.getColumnDetailsForEntity().subscribe((response: any) => {
            if(response && response.data) {
                response.data.forEach(table => {
                    if(table.entity == entityName) {
                        table.columns.forEach(column => {
                            let columnData = {
                                "field": column.name, 
                                "header": column.name,
                                "type": column.type
                            };
                            cols.push(columnData);                   
                        });
                    }
                });
            }
        })        
        return cols;
    }


    getEntityList() {
        let itemArrayObject = [];
        let map = new Map<string, string>()  ;
        this.getColumnDetailsForEntity().subscribe((response: any) => {
            if(response && response.data) {
                response.data.forEach(table => {
                    let entityData = {
                        "label": table.label, "icon": 'pi pi-fw pi-bookmark', "routerLink": ['/pages/motscrud', {'entity':table.entity, 'label':table.label}] };
                        itemArrayObject.push(entityData);                   
                });
            }
        })
        let jsonArrayObject = [
            {
                "label": "Home",
                "items":[
                    {"label": "Dashboard","icon": "pi pi-fw pi-home", "routerLink": ["/"]}
                ]
            },
            {
                "label": 'default',
                "items": itemArrayObject
            },
            {
                "label": "UI Components",
                "items": [
                    {"label": "Form Layout", "icon": "pi pi-fw pi-id-card", "routerLink": ["/uikit/formlayout"]},
                    {"label": "Input", "icon": "pi pi-fw pi-check-square", "routerLink": ["/uikit/input"]},
                    {"label": "Float label", "icon": "pi pi-fw pi-bookmark", "routerLink": ["/uikit/floatlabel"]},
                    {"label": "Invalid State", "icon": "pi pi-fw pi-exclamation-circle", "routerLink": ["/uikit/invalidstate"]},
                    {"label": "Button", "icon": "pi pi-fw pi-mobile", "routerLink": ["/uikit/button"], "class": "rotated-icon"},
                    {"label": "Table", "icon": "pi pi-fw pi-table", "routerLink": ["/uikit/table"]},
                    {"label": "List", "icon": "pi pi-fw pi-list", "routerLink": ["/uikit/list"]},
                    {"label": "Tree", "icon": "pi pi-fw pi-share-alt", "routerLink": ["/uikit/tree"]},
                    {"label": "Panel", "icon": "pi pi-fw pi-tablet", "routerLink": ["/uikit/panel"]},
                    {"label": "Overlay", "icon": "pi pi-fw pi-clone", "routerLink": ["/uikit/overlay"]},
                    {"label": "Media", "icon": "pi pi-fw pi-image", "routerLink": ["/uikit/media"]},
                    {"label": "Menu", "icon": "pi pi-fw pi-bars", "routerLink": ["/uikit/menu"], "preventExact": true},
                    {"label": "Message", "icon": "pi pi-fw pi-comment", "routerLink": ["/uikit/message"]},
                    {"label": "File", "icon": "pi pi-fw pi-file", "routerLink": ["/uikit/file"]},
                    {"label": "Chart", "icon": "pi pi-fw pi-chart-bar", "routerLink": ["/uikit/charts"]},
                    {"label": "Misc", "icon": "pi pi-fw pi-circle", "routerLink": ["/uikit/misc"]}
                ]
            },
            {
                "label": "Pages",
                "items": [
                    {"label": "Crud", "icon": "pi pi-fw pi-user-edit", "routerLink": ["/pages/crud"]},
                    {"label": "Timeline", "icon": "pi pi-fw pi-calendar", "routerLink": ["/pages/timeline"]},
                    {"label": "Landing", "icon": "pi pi-fw pi-globe", "routerLink": ["pages/landing"]},
                    {"label": "Login", "icon": "pi pi-fw pi-sign-in", "routerLink": ["pages/login"]},
                    {"label": "Error", "icon": "pi pi-fw pi-times-circle", "routerLink": ["pages/error"]},
                    {"label": "Not Found", "icon": "pi pi-fw pi-exclamation-circle", "routerLink": ["pages/notfound"]},
                    {"label": "Access Denied", "icon": "pi pi-fw pi-lock", "routerLink": ["pages/access"]},
                    {"label": "Empty", "icon": "pi pi-fw pi-circle", "routerLink": ["/pages/empty"]}
                ]
            }            
        ];
        return jsonArrayObject;
    }


    getColumnDetailsForEntity(): Observable<any> {
        return this.http.get<any>('assets/demo/data/metadata.json');
    }
}
