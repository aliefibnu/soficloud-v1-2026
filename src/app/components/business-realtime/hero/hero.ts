import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [NgOptimizedImage, TranslatePipe],
  selector: 'app-hero',
  templateUrl: './hero.html',
})
export class Hero {}
