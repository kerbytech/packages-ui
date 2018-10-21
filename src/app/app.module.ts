import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PackageComponent } from './package/package.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PackagesDirectoryComponent } from './packages-directory/packages-directory.component';
import {RouterModule, Routes} from '@angular/router';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {PackagesControllerService} from './services/packages/services/packages-controller.service';
import {ApiConfiguration} from './services/packages/api-configuration';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/products/services/product.service';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {SuiModule} from 'ng2-semantic-ui';
import { UpdatePackageComponent } from './update-package/update-package.component';
import {CurrencyService} from './services/currency/currency.service';

const appRoutes: Routes = [
  { path: '', component: PackagesDirectoryComponent },
  { path: 'create-package', component: PackageComponent },
  { path: 'update-package/:id', component: PackageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PackageComponent,
    NavbarComponent,
    PackagesDirectoryComponent,
    UpdatePackageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    SuiModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule, FormsModule
  ],
  providers: [
    ApiConfiguration,
    PackagesControllerService,
    ProductService,
    CurrencyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
