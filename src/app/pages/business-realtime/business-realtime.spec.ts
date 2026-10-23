import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { BusinessRealtime } from './business-realtime';

describe('BusinessRealtime', () => {
  let component: BusinessRealtime;
  let fixture: ComponentFixture<BusinessRealtime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRealtime],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessRealtime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
