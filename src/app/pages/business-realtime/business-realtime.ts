import { Component } from '@angular/core';
import { Hero } from '../../components/business-realtime/hero/hero';
import { VisibilityFunction } from '../../components/business-realtime/visibility-function/visibility-function';

@Component({
  imports: [Hero, VisibilityFunction],
  selector: 'app-business-realtime',
  templateUrl: './business-realtime.html',
})
export class BusinessRealtime {}
