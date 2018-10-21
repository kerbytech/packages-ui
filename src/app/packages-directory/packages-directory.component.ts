import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PackagesControllerService} from '../services/packages/services/packages-controller.service';
import {PackageDto} from '../services/packages/models/package-dto';
import {Router} from '@angular/router';
import {ModalTemplate, SuiModalService, TemplateModalConfig} from 'ng2-semantic-ui';
import {CurrencyDto} from '../services/packages/models/currency-dto';
import {CurrencyService} from '../services/currency/currency.service';

export interface IContext {
  data: string;
}

@Component({
  selector: 'app-packages-directory',
  templateUrl: './packages-directory.component.html',
  styleUrls: ['./packages-directory.component.css']
})
export class PackagesDirectoryComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;

  isLoaded: boolean;
  currency: CurrencyDto;
  packages: PackageDto[];

  constructor(private router: Router, private packageService: PackagesControllerService, private currencyService: CurrencyService,
              public modalService: SuiModalService) {
    this.isLoaded = false;
    this.packages = [];

    this.currency = currencyService.selectedCurrency;
    currencyService.currencyChange.subscribe(value => {
      this.currency = value;
      this.refreshPackages();
    });
  }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.refreshPackages();
  }

  refreshPackages(): void {
    this.isLoaded = false;
    this.packageService.getPackagesUsingGET(this.currency.code).subscribe(value => {
      this.packages = [];
      if (value != null && value.packages != null) {
        this.packages = [...value.packages];
      }
      this.isLoaded = true;
    });
  }

  goCreate(): void {
    this.router.navigate(['/create-package']);
  }

  doDelete(id: number, name: string): void {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.context = { data: 'Are you sure you want to delete Package ' + name + '?' };

    this.modalService
      .open(config)
      .onApprove(result => {
        this.packageService.deletePackageUsingDELETE(id).subscribe(value => {
        }, error2 => {
          // TODO toast error
          console.error('Something went wrong deleting package', error2);
        }, () => {
          this.refreshPackages();
        });
      })
      .onDeny(result => {
        // do nothing
      });
  }

  goUpdate(id: number): void {
    this.router.navigate(['/update-package', id]);
  }
}
