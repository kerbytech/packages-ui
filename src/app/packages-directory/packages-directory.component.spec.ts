import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesDirectoryComponent } from './packages-directory.component';

describe('PackagesDirectoryComponent', () => {
  let component: PackagesDirectoryComponent;
  let fixture: ComponentFixture<PackagesDirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesDirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
