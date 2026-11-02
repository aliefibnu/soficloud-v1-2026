import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { VisibilitySectionShell } from '../visibility-section-shell/visibility-section-shell';
import { ErpWindowChrome } from '../erp-window-chrome/erp-window-chrome';

@Component({
  selector: 'app-procurement-control',
  imports: [VisibilitySectionShell, ErpWindowChrome, TranslatePipe],
  templateUrl: './procurement-control.html',
})
export class ProcurementControl {}
