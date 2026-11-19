import { Component, DestroyRef, inject } from '@angular/core';
import { BusinessControl } from '../../components/landing/business-control/business-control';
// import { OverviewFeature } from '../../components/landing/overview-feature/overview-feature';
import { Features } from '../../components/landing/features/features';
import { Hero } from '../../components/landing/hero/hero';
import { WhyChooseUs } from '../../components/landing/why-choose-us/why-choose-us';
import { Customers } from '../../components/landing/customers/customers';
import { BusinessModel } from '../../components/landing/business-model/business-model';
import { Price } from '../../components/landing/price/price';
import { Cta } from '../../components/landing/cta/cta';
import { LandingAnchorService } from '../../systems/lib/landing-anchor.service';

@Component({
  imports: [
    BusinessControl,
    // OverviewFeature,
    Features,
    Hero,
    WhyChooseUs,
    Customers,
    BusinessModel,
    Price,
    Cta,
  ],
  selector: 'app-landing',
  templateUrl: './landing.html',
})
export class Landing {
  protected readonly anchorService = inject(LandingAnchorService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.anchorService.reset();
    });
  }
}
