import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';

export interface ApproverStep {
  readonly number: string;
  readonly role: string;
}

@Component({
  selector: 'app-status-and-flow',
  imports: [ProcessSectionShell, TranslatePipe],
  templateUrl: './status-and-flow.html',
})
export class StatusAndFlow {
  protected readonly mainFlowSteps: readonly string[] = ['Entry', 'Confirm', 'Running'];

  protected readonly optionalStatuses: readonly string[] = [
    'Verify',
    'Revise',
    'Cancel',
    'Pending',
  ];

  protected readonly approverSequence: readonly ApproverStep[] = [
    { number: '01', role: 'Marketing Manager' },
    { number: '02', role: 'Accounting & Finance' },
    { number: '03', role: 'Director' },
  ];
}
