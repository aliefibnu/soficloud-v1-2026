import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-demo-company-info',
  imports: [TranslatePipe],
  templateUrl: './company-info.html',
  host: {
    class: 'block w-full h-full bg-[#1D44EB] text-white p-6 sm:p-8 lg:p-10 xl:p-12',
  },
})
export class ScheduleDemoCompanyInfo {}
