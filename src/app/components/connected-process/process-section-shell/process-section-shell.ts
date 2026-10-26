import { Component, input } from '@angular/core';

@Component({
  selector: 'app-process-section-shell',
  templateUrl: './process-section-shell.html',
})
export class ProcessSectionShell {
  readonly sectionId = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly stageBgClass = input<string>('bg-[#E8F0FC]');
}
