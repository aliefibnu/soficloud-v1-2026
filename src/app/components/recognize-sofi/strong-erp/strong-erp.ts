import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [NgOptimizedImage, TranslatePipe],
  selector: 'app-strong-erp',
  templateUrl: './strong-erp.html',
})
export class StrongErp {
  protected readonly paragraphKeys: readonly string[] = [
    'RECOGNIZE_SOFI.STRONG_ERP.PARAGRAPH_1',
    'RECOGNIZE_SOFI.STRONG_ERP.PARAGRAPH_2',
  ];
}
