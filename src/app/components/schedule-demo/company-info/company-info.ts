import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-demo-company-info',
  imports: [TranslatePipe],
  templateUrl: './company-info.html',
  host: {
    class: 'block w-full h-full bg-[#0162EF] text-white p-6 sm:p-8 lg:p-12 xl:p-14 rounded-[24px] overflow-hidden',
  },
})
export class ScheduleDemoCompanyInfo {}
