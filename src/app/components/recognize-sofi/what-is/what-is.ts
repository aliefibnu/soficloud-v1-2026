import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [NgOptimizedImage, TranslatePipe],
  selector: 'app-what-is',
  templateUrl: './what-is.html',
})
export class WhatIs {
  protected readonly paragraphKeys: readonly string[] = [
    'RECOGNIZE_SOFI.WHAT_IS.PARAGRAPH_1',
    'RECOGNIZE_SOFI.WHAT_IS.PARAGRAPH_2',
    'RECOGNIZE_SOFI.WHAT_IS.PARAGRAPH_3',
  ];
}
