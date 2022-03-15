import { Component, Injectable } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { HttpInterceptor,HttpRequest,  HttpHandler} from '@angular/common/http/http';
import { Constants } from '../app.constants';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPServiceInterceptor implements HttpInterceptor {
    
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const doNotIntrupt = request.params.has(Constants.DO_NOT_INTERCEPT_PARAMETER)?request.params.get(Constants.DO_NOT_INTERCEPT_PARAMETER):false;
        console.log("sara");
        return next.handle(request);
    }

    constructor(private primengConfig: PrimeNGConfig) { }
}
