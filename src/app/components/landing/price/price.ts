import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-price',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './price.html',
})
export class Price {}
