import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Hero } from '../../../components/features/sales-management-2/hero/hero';

@Component({
  imports: [Hero],
  selector: 'app-sales-management-2',
  templateUrl: './sales-management-2.html',
})
export class SalesManagement2 implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }
}
