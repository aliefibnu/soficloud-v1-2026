import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Hero } from '../../../components/features/financial-management-1/hero/hero';

@Component({
  imports: [Hero],
  selector: 'app-financial-management-1',
  templateUrl: './financial-management-1.html',
})
export class FinancialManagement1 implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }
}
