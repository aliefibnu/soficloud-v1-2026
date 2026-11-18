import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Hero section for the Smart Workflow page featuring headline copy and
 * an approval workflow tablet preview seated on a vector pedestal.
 */
@Component({
  imports: [NgOptimizedImage, TranslatePipe],
  selector: 'app-hero',
  templateUrl: './hero.html',
})
export class Hero {}
