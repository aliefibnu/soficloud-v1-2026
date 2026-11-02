import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { VisibilitySectionShell } from '../visibility-section-shell/visibility-section-shell';
import { ErpWindowChrome } from '../erp-window-chrome/erp-window-chrome';

export interface MrpItem {
  readonly selected: boolean;
  readonly code: string;
  readonly name: string;
  readonly group: string;
  readonly unit: string;
  readonly onHand: number;
  readonly booking: number;
  readonly availability: number;
  readonly order: number;
  readonly expected: number;
}

@Component({
  selector: 'app-material-readiness',
  imports: [VisibilitySectionShell, ErpWindowChrome, TranslatePipe],
  templateUrl: './material-readiness.html',
})
export class MaterialReadiness {
  readonly items: readonly MrpItem[] = [
    {
      selected: false,
      code: 'RM-T001',
      name: 'Teak Wood Boards',
      group: 'RAW MATERIAL',
      unit: 'UNIT',
      onHand: 14,
      booking: 0,
      availability: 14,
      order: 0,
      expected: 14,
    },
    {
      selected: true,
      code: 'RM-S001',
      name: 'Solid Wood Legs',
      group: 'RAW MATERIAL',
      unit: 'UNIT',
      onHand: 18,
      booking: 0,
      availability: 18,
      order: 0,
      expected: 18,
    },
    {
      selected: true,
      code: 'RM-S002',
      name: 'Joinery Screws',
      group: 'RAW MATERIAL',
      unit: 'UNIT',
      onHand: 42,
      booking: 0,
      availability: 42,
      order: 0,
      expected: 42,
    },
    {
      selected: true,
      code: 'RM-S003',
      name: 'Supreme Wood Glue',
      group: 'RAW MATERIAL',
      unit: 'UNIT',
      onHand: 4,
      booking: 0,
      availability: 4,
      order: 0,
      expected: 4,
    },
    {
      selected: false,
      code: 'RM-R001',
      name: 'Royal-Glaze Varnish Gloss',
      group: 'RAW MATERIAL',
      unit: 'UNIT',
      onHand: 9,
      booking: 0,
      availability: 9,
      order: 0,
      expected: 9,
    },
    {
      selected: true,
      code: 'RM-L001',
      name: 'Luxury Shields Box',
      group: 'RAW MATERIAL',
      unit: 'UNIT',
      onHand: 0,
      booking: 0,
      availability: 0,
      order: 0,
      expected: 0,
    },
    {
      selected: false,
      code: 'WIP-W001',
      name: 'WIP - Jaticraft Table Assembly Process',
      group: 'WORK IN PROCESS',
      unit: 'UNIT',
      onHand: 0,
      booking: 0,
      availability: 0,
      order: 0,
      expected: 0,
    },
    {
      selected: false,
      code: 'WIP-W002',
      name: 'WIP - Jaticraft Table Painting',
      group: 'WORK IN PROCESS',
      unit: 'UNIT',
      onHand: 0,
      booking: 0,
      availability: 0,
      order: 0,
      expected: 0,
    },
    {
      selected: false,
      code: 'WIP-W003',
      name: 'WIP - Jaticraft Table Packing',
      group: 'WORK IN PROCESS',
      unit: 'UNIT',
      onHand: 0,
      booking: 0,
      availability: 0,
      order: 0,
      expected: 0,
    },
  ];
}
