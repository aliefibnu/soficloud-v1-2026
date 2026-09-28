import { Component } from '@angular/core';
import { BusinessControl } from '../../components/landing/business-control/business-control';
import { OverviewFeature } from '../../components/landing/overview-feature/overview-feature';
import { Features } from '../../components/landing/features/features';
import { Hero } from '../../components/landing/hero/hero';

@Component({
  imports: [BusinessControl, OverviewFeature, Features, Hero],
  selector: 'app-landing',
  templateUrl: './landing.html',
})
export class Landing {}
