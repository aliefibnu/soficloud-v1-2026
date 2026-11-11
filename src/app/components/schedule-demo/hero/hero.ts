import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-demo-hero',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './hero.html',
  host: {
    class: 'block w-full pb-6 sm:pb-8',
  },
})
export class ScheduleDemoHero {}
