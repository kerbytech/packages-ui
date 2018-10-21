import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {PackagesControllerService} from '../services/packages/services/packages-controller.service';
import {ProductService} from '../services/products/services/product.service';
import {TPProductDto} from '../services/products/models/product-dto';
import {CurrencyService} from '../services/currency/currency.service';
import {CurrencyDto} from '../services/packages/models/currency-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  isLoaded: boolean;
  packageForm: FormGroup;

  packageId: number;
  packageName: string;
  packageDescription: string;
  selectedProducts: {id: string, text: string}[] = [];

  currency: CurrencyDto;
  availableProducts: TPProductDto[] = [];

  dropdownProducts: {id: string, text: string}[] = [];
  dropdownSettings: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private packageService: PackagesControllerService,  private currencyService: CurrencyService,
              private productService: ProductService) {
    this.isLoaded = false;

    this.packageForm = new FormGroup({
      'name': new FormControl(this.packageName, [
        Validators.required,
        Validators.minLength(0)
      ])
    });

    this.currency = this.currencyService.selectedCurrency;
    this.currencyService.currencyChange.subscribe(value => {
      this.currency = value;
    });

    this.availableProducts = [];
    this.dropdownProducts = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }

  get name() { return this.packageForm.get('name'); }

  ngOnInit() {
    this.isLoaded = false;
    // init available products and for dropdown
    this.productService.getProducts(false).subscribe(value => {
      this.isLoaded = false;
      try {
        this.availableProducts = value;
        const _dropdownProducts = [];
        for (const product of value) {
          _dropdownProducts.push({
            id: product.id,
            text: product.name
          });
        }
        this.dropdownProducts = [..._dropdownProducts];
        const id = this.route.snapshot.paramMap.get('id');
        if (id != null) {
          // update
          this.packageId = +id;
          this.packageService.readPackageUsingGET({id: this.packageId, currency: this.currency.code}).subscribe(value => {
            this.packageName = value.package.name;
            this.packageDescription = value.package.description;
            const selProducts = [];
            for (const product of value.package.products) {
              selProducts.push(
                {id: product.id, text: product.name}
              );
            }
            this.selectedProducts = [... selProducts];
            this.isLoaded = true;
          }, error2 => {
            // TODO toast error
            console.error('Something went wrong getting info about package', error2);
          });
        } else {
          // create
          this.selectedProducts = [];
          this.isLoaded = true;
        }
      } catch (e) {
        // TODO toast error
        console.error('Unable to parse Package API response', e);
        // TODO alert just because it's important if this fails to alert user - replace with toast
        alert('Unable to parse packages from API.');
      }
    }, error2 => {
      // TODO toast error
      console.error('Package API is down! Can\'t perform lookup for Products', error2);
      // TODO alert just because it's important if this fails to alert user - replace with toast
      alert('Unable to get packages from API. Please try again later');
    });




  }

  getSelectedProductsAsDtos(): TPProductDto[] {
    const productDtos: TPProductDto[] = [];
    for (const availProduct of this.availableProducts) {
      if (this.selectedProducts.filter(value => value.id === availProduct.id).length > 0) {
        productDtos.push({
          id: availProduct.id,
          name: availProduct.name,
          usdPrice: availProduct.usdPrice
        });
      }
    }
    return productDtos;
  }

  doCreate(): void {
    this.packageService.createPackageUsingPOST({
      package: {
        name: this.packageName,
        description: this.packageDescription,
        products: this.getSelectedProductsAsDtos()
      }
    }).subscribe(value => {
      this.router.navigate(['/']);
    }, error2 => {
      // TODO toast error
      console.error('Something went wrong creating package', error2);
    });

  }

  doUpdate() {
    this.packageService.updatePackageUsingPUT({
        id: this.packageId,
        packageRequest: {
          package: {
            name: this.packageName,
            description: this.packageDescription,
            products: this.getSelectedProductsAsDtos()
          }
        }
    }).subscribe(value => {
      this.router.navigate(['/']);
    }, error2 => {
      // TODO toast error
      console.error('Something went wrong updating package', error2);
    });

  }

  onSubmit(): void {}

}
