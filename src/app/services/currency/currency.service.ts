import { Injectable } from '@angular/core';
import {CurrencyDto} from '../packages/models/currency-dto';
import {Subject} from 'rxjs/index';

@Injectable()
export class CurrencyService {

  private _selectedCurrency: CurrencyDto;
  currencyChange: Subject<CurrencyDto> = new Subject<CurrencyDto>();

  get selectedCurrency(): CurrencyDto {
    return this._selectedCurrency;
  }

  set selectedCurrency(value: CurrencyDto) {
    this.currencyChange.next(value);
    this._selectedCurrency = value;
  }

  constructor() {
    this._selectedCurrency = {code: 'USD', name: 'United States Dollar'};
  }

}
