import { Component } from '@angular/core';
import { Hero } from '../../components/business-realtime/hero/hero';
import { VisibilityFunction } from '../../components/business-realtime/visibility-function/visibility-function';
import { SalesPerformance } from '../../components/business-realtime/visibility-sections/sales-performance/sales-performance';

@Component({
  imports: [Hero, VisibilityFunction, SalesPerformance],
  selector: 'app-business-realtime',
  templateUrl: './business-realtime.html',
})
export class BusinessRealtime {}
