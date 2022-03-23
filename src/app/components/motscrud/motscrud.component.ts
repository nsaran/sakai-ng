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

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: any[];

    product: any;

    selectedProducts: any[];

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
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.searchButton = false;
        this.saveButton = true;
    }


    openSearch() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.searchButton = true;
        this.saveButton = false;
    }

    searchProduct() {
        //this.productService.getProducts().then(data => this.products = data);
        this.dataService.getData(this.entityName).then(data => this.products = data);        
        this.productDialog = false;
    }


    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = {...product};
        this.productDialog = true;
        this.searchButton = false;
        this.saveButton = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = {...product};
    }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    confirmDelete(){
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
        this.searchButton = false;
        this.saveButton = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    isStringType(columnName: string): any {
        return false;
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
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
