import { Component } from '@angular/core';
import { Hero } from '../../components/business-realtime/hero/hero';

@Component({
  imports: [Hero],
  selector: 'app-business-realtime',
  templateUrl: './business-realtime.html',
})
export class BusinessRealtime {}
