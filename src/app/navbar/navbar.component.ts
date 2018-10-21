import { Component, OnInit } from '@angular/core';
import {CurrencyDto} from '../services/packages/models/currency-dto';
import {PackagesControllerService} from '../services/packages/services/packages-controller.service';
import {CurrencyService} from '../services/currency/currency.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currencies: CurrencyDto[];

  constructor(private packageService: PackagesControllerService, public currencyService: CurrencyService) {
    this.currencies = [];
  }

  ngOnInit() {
    if (this.currencies.length <= 0) {
      this.packageService.getCurrencyCodesUsingGET().subscribe(value => {
        this.currencies = [];
        this.currencies = [... value.currencies];
        this.currencyService.selectedCurrency = this.currencies.find(currency => currency.code === 'USD');
      }, error2 => {
        // TODO handle error
        console.error('Something went wrong getting currencies', error2);
      });
    }
  }



}
