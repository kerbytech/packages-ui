import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TPProductDto} from '../models/product-dto';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProductService {

  private productCache$: ReplaySubject<Array<TPProductDto>>;

  constructor(private http: HttpClient) {
    this.productCache$ = new ReplaySubject();
  }

  getProducts(forceRefresh?: boolean): ReplaySubject<Array<TPProductDto>> {
    if (!this.productCache$.observers.length || forceRefresh) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('authorization', 'Basic ' + btoa(environment.productAPIUsername + ':' + environment.productAPIPassword));

      this.http.get(environment.productAPI + '/products', {headers: headers}).subscribe(value => {
        const productDtos = new Array();
        for (const obj of <any>value) {
          if (obj !== undefined) {
            const productDto: TPProductDto = {
              id: obj['id'],
              name: obj['name'],
              usdPrice: obj['usdPrice']
            };
            productDtos.push(productDto);
          }
        }
        this.productCache$.next(productDtos);
      }, error2 => {
        console.error('Something went wrong getting availableProducts');
        return this.productCache$.error(error2);
      });
    }
    return this.productCache$;
  }
}
