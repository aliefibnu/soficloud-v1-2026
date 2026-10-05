import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './footer.html',
  host: {
    class: 'block w-full',
  },
})
export class Footer {}
