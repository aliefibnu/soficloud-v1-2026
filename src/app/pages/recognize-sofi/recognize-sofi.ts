import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Hero } from '../../components/recognize-sofi/hero/hero';
import { WhatIs } from '../../components/recognize-sofi/what-is/what-is';
import { StrongErp } from '../../components/recognize-sofi/strong-erp/strong-erp';
import { OurJourney } from '../../components/recognize-sofi/our-journey/our-journey';

@Component({
  imports: [Hero, WhatIs, StrongErp, OurJourney],
  selector: 'app-recognize-sofi',
  templateUrl: './recognize-sofi.html',
})
export class RecognizeSofi implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }
}
