/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { CurrenciesResponse } from '../models/currencies-response';
import { PackagesResponse } from '../models/packages-response';
import { PackageRequest } from '../models/package-request';
import { PackageResponse } from '../models/package-response';
import { ResponseEntity } from '../models/response-entity';

/**
 * Packages Controller
 */
@Injectable()
class PackagesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get all currencies available for exchange rate conversion. These contains both currency codes and human readable labels.
   * @return OK
   */
  getCurrencyCodesUsingGETResponse(): Observable<HttpResponse<CurrenciesResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/packages-api/currency`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: CurrenciesResponse = null;
        _body = _resp.body as CurrenciesResponse;
        return _resp.clone({body: _body}) as HttpResponse<CurrenciesResponse>;
      })
    );
  }

  /**
   * Get all currencies available for exchange rate conversion. These contains both currency codes and human readable labels.
   * @return OK
   */
  getCurrencyCodesUsingGET(): Observable<CurrenciesResponse> {
    return this.getCurrencyCodesUsingGETResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param currency currency
   * @return OK
   */
  getPackagesUsingGETResponse(currency?: string): Observable<HttpResponse<PackagesResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (currency != null) __params = __params.set('currency', currency.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/packages-api/package`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: PackagesResponse = null;
        _body = _resp.body as PackagesResponse;
        return _resp.clone({body: _body}) as HttpResponse<PackagesResponse>;
      })
    );
  }

  /**
   * @param currency currency
   * @return OK
   */
  getPackagesUsingGET(currency?: string): Observable<PackagesResponse> {
    return this.getPackagesUsingGETResponse(currency).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param packageRequest packageRequest
   * @return OK
   */
  createPackageUsingPOSTResponse(packageRequest: PackageRequest): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = packageRequest;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/packages-api/package`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: number = null;
        _body = parseFloat(_resp.body as string);
        return _resp.clone({body: _body}) as HttpResponse<number>;
      })
    );
  }

  /**
   * @param packageRequest packageRequest
   * @return OK
   */
  createPackageUsingPOST(packageRequest: PackageRequest): Observable<number> {
    return this.createPackageUsingPOSTResponse(packageRequest).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `PackagesControllerService.ReadPackageUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `currency`: currency
   *
   * @return OK
   */
  readPackageUsingGETResponse(params: PackagesControllerService.ReadPackageUsingGETParams): Observable<HttpResponse<PackageResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.currency != null) __params = __params.set('currency', params.currency.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/packages-api/package/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: PackageResponse = null;
        _body = _resp.body as PackageResponse;
        return _resp.clone({body: _body}) as HttpResponse<PackageResponse>;
      })
    );
  }

  /**
   * @param params The `PackagesControllerService.ReadPackageUsingGETParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `currency`: currency
   *
   * @return OK
   */
  readPackageUsingGET(params: PackagesControllerService.ReadPackageUsingGETParams): Observable<PackageResponse> {
    return this.readPackageUsingGETResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `PackagesControllerService.UpdatePackageUsingPUTParams` containing the following parameters:
   *
   * - `packageRequest`: packageRequest
   *
   * - `id`: id
   *
   * @return OK
   */
  updatePackageUsingPUTResponse(params: PackagesControllerService.UpdatePackageUsingPUTParams): Observable<HttpResponse<ResponseEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.packageRequest;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/packages-api/package/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ResponseEntity = null;
        _body = _resp.body as ResponseEntity;
        return _resp.clone({body: _body}) as HttpResponse<ResponseEntity>;
      })
    );
  }

  /**
   * @param params The `PackagesControllerService.UpdatePackageUsingPUTParams` containing the following parameters:
   *
   * - `packageRequest`: packageRequest
   *
   * - `id`: id
   *
   * @return OK
   */
  updatePackageUsingPUT(params: PackagesControllerService.UpdatePackageUsingPUTParams): Observable<ResponseEntity> {
    return this.updatePackageUsingPUTResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  deletePackageUsingDELETEResponse(id: number): Observable<HttpResponse<ResponseEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/packages-api/package/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ResponseEntity = null;
        _body = _resp.body as ResponseEntity;
        return _resp.clone({body: _body}) as HttpResponse<ResponseEntity>;
      })
    );
  }

  /**
   * @param id id
   * @return OK
   */
  deletePackageUsingDELETE(id: number): Observable<ResponseEntity> {
    return this.deletePackageUsingDELETEResponse(id).pipe(
      map(_r => _r.body)
    );
  }
}

module PackagesControllerService {

  /**
   * Parameters for readPackageUsingGET
   */
  export interface ReadPackageUsingGETParams {

    /**
     * id
     */
    id: number;

    /**
     * currency
     */
    currency?: string;
  }

  /**
   * Parameters for updatePackageUsingPUT
   */
  export interface UpdatePackageUsingPUTParams {

    /**
     * packageRequest
     */
    packageRequest: PackageRequest;

    /**
     * id
     */
    id: number;
  }
}

export { PackagesControllerService }