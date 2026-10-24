import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-visibility-section-shell',
  imports: [TranslatePipe],
  templateUrl: './visibility-section-shell.html',
})
export class VisibilitySectionShell {
  readonly sectionId = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly descriptionKey = input.required<string>();
  readonly decisionTextKey = input.required<string>();
  readonly decisionLabelKey = input<string>(
    'BUSINESS_REALTIME.VISIBILITY_SECTIONS.COMMON.DECISION_LABEL',
  );
  readonly stageBgClass = input<string>('bg-[#F9CEC8]');
}
