import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-demo-hero',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './hero.html',
})
export class ScheduleDemoHero {}
