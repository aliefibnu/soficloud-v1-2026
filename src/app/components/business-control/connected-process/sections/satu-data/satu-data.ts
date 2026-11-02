import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';

export interface SatuDataCard {
  readonly number: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
}

@Component({
  selector: 'app-satu-data',
  imports: [ProcessSectionShell, TranslatePipe],
  templateUrl: './satu-data.html',
})
export class SatuData {
  readonly cards: readonly SatuDataCard[] = [
    {
      number: '01',
      titleKey: 'CONNECTED_PROCESS.SATU_DATA.CARDS.CARD_1.TITLE',
      descriptionKey: 'CONNECTED_PROCESS.SATU_DATA.CARDS.CARD_1.DESCRIPTION',
    },
    {
      number: '02',
      titleKey: 'CONNECTED_PROCESS.SATU_DATA.CARDS.CARD_2.TITLE',
      descriptionKey: 'CONNECTED_PROCESS.SATU_DATA.CARDS.CARD_2.DESCRIPTION',
    },
    {
      number: '03',
      titleKey: 'CONNECTED_PROCESS.SATU_DATA.CARDS.CARD_3.TITLE',
      descriptionKey: 'CONNECTED_PROCESS.SATU_DATA.CARDS.CARD_3.DESCRIPTION',
    },
  ];
}
