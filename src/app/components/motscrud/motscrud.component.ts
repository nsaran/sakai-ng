import { Component, OnInit } from '@angular/core';
import { Product } from '../../api/product';
import { ProductService } from '../../service/productservice';
import { DataService } from '../../service/dataservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, UrlSegment, ActivatedRoute } from '@angular/router';
import { MetaService } from '../../service/metaservice';

@Component({
    templateUrl: './motscrud.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class MotsCrudComponent implements OnInit {

    entityName: string;

    entityLabel: string;

    entity: any;

    entities: any[];

    selectedEntities: any[];

    entityDialog: boolean;

    deleteEntityDialog: boolean = false;

    deleteEntitiesDialog: boolean = false;

    submitted: boolean;

    cols: any[];

    columns: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    searchButton: boolean = false;

    saveButton: boolean = false;

    constructor(private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService,  private router: Router,
                private activeRoute: ActivatedRoute, private metaService: MetaService,
                private dataService: DataService) {}

    ngOnInit() {

        //forces component to reload
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.activeRoute.params.subscribe(params => {
            this.entityName = params['entity'];
            this.entityLabel = params['label'];
            this.columns = this.metaService.getColumnList(this.entityName);
            console.log(this.columns);
          })

        //this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'price', header: 'Price'},
            {field: 'category', header: 'Category'},
            {field: 'rating', header: 'Reviews'},
            {field: 'inventoryStatus', header: 'Status'}
        ];

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
        
        this.searchButton = true;

        this.openSearch();
    }

    openNew() {
        this.entity = {};
        this.submitted = false;
        this.entityDialog = true;
        this.searchButton = false;
        this.saveButton = true;
    }


    openSearch() {
        this.entity = {};
        this.submitted = false;
        this.entityDialog = true;
        this.searchButton = true;
        this.saveButton = false;
    }

    searchEntity() {
        //this.productService.getProducts().then(data => this.products = data);
        this.dataService.getData(this.entityLabel).then(data => this.entities = data);        
        this.entityDialog = false;
    }


    deleteSelectedEntities() {
        this.deleteEntitiesDialog = true;
    }

    editEntity(entity: any) {
        this.entity = {...entity};
        this.entityDialog = true;
        this.searchButton = false;
        this.saveButton = true;
    }

    deleteEntity(entity: any) {
        this.deleteEntityDialog = true;
        this.entity = {...entity};
    }

    confirmDeleteSelected(){
        this.deleteEntitiesDialog = false;
        this.entities = this.entities.filter(val => !this.selectedEntities.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedEntities = null;
    }

    confirmDelete(){
        this.deleteEntityDialog = false;
        this.entities = this.entities.filter(val => val.id !== this.entity.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.entity = {};
    }

    hideDialog() {
        this.entityDialog = false;
        this.submitted = false;
        this.searchButton = false;
        this.saveButton = false;
    }

    saveEntity() {
        this.submitted = true;

        if (this.entity.name.trim()) {
            if (this.entity.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
                this.entities[this.findIndexById(this.entity.id)] = this.entity;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            } else {
                this.entity.id = this.createId();
                this.entity.code = this.createId();
                this.entity.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.entities.push(this.entity);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.entities = [...this.entities];
            this.entityDialog = false;
            this.entity = {};
        }
    }

    isStringType(columnName: string): any {
        return false;
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
