import { Component } from '@angular/core';
import { BusinessControl } from '../../components/landing/business-control/business-control';
import { OverviewFeature } from '../../components/landing/overview-feature/overview-feature';
import { Features } from '../../components/landing/features/features';
import { Hero } from '../../components/landing/hero/hero';
import { WhyChooseUs } from '../../components/landing/why-choose-us/why-choose-us';
import { Customers } from '../../components/landing/customers/customers';
import { BusinessModel } from '../../components/landing/business-model/business-model';

@Component({
  imports: [
    BusinessControl,
    OverviewFeature,
    Features,
    Hero,
    WhyChooseUs,
    Customers,
    BusinessModel,
  ],
  selector: 'app-landing',
  templateUrl: './landing.html',
})
export class Landing {}
