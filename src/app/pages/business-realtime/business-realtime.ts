import { Component } from '@angular/core';
import { Hero } from '../../components/business-realtime/hero/hero';
import { VisibilityFunction } from '../../components/business-realtime/visibility-function/visibility-function';
import { SalesPerformance } from '../../components/business-realtime/visibility-sections/sales-performance/sales-performance';
import { ProcurementControl } from '../../components/business-realtime/visibility-sections/procurement-control/procurement-control';
import { MaterialReadiness } from '../../components/business-realtime/visibility-sections/material-readiness/material-readiness';
import { OrderPipeline } from '../../components/business-realtime/visibility-sections/order-pipeline/order-pipeline';
import { FinancialVisibility } from '../../components/business-realtime/visibility-sections/financial-visibility/financial-visibility';

@Component({
  imports: [
    Hero,
    VisibilityFunction,
    SalesPerformance,
    ProcurementControl,
    MaterialReadiness,
    OrderPipeline,
    FinancialVisibility,
  ],
  selector: 'app-business-realtime',
  templateUrl: './business-realtime.html',
})
export class BusinessRealtime {}
