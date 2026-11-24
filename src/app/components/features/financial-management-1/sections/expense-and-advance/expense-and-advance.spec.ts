import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { ExpenseAndAdvance } from './expense-and-advance';

const ID_TRANSLATIONS = {
  FINANCIAL_MANAGEMENT_1: {
    EXPENSE_AND_ADVANCE: {
      TITLE: 'Expense Dan Advance Dalam Alur Yang Terkontrol',
      SUBTITLE:
        'Lima area yang ditonjolkan: employee reimbursement, expense claim, operational advance, supplier advance payment, serta payment planning & budget control.',
      TABS: {
        REIMBURSEMENT: {
          TITLE: 'Reimbursement',
          SUBTITLE: 'EMPLOYEE REIMBURSEMENT',
        },
        CASH_ADVANCE: {
          TITLE: 'Cash Advance',
          SUBTITLE: 'OPERATIONAL / EMPLOYEE ADVANCE',
        },
      },
      REIMBURSEMENT: {
        FLOW_TITLE: 'Dari expense claim hingga payment',
        STEPS: {
          CLAIM_REQUEST: {
            TITLE: 'Claim Request',
            SUBTITLE: 'Purpose & attachment',
          },
          NOTIFICATION: {
            TITLE: 'Notification',
            SUBTITLE: 'Email / WhatsApp',
          },
          LAYERED_APPROVAL: {
            TITLE: 'Layered Approval',
            SUBTITLE: 'Authorization matrix',
          },
          MONITORING: {
            TITLE: 'Monitoring',
            SUBTITLE: 'Status & audit trail',
          },
          PAYMENT: {
            TITLE: 'Payment',
            SUBTITLE: 'Authorized settlement',
          },
          ACCOUNT_PAYABLE: {
            TITLE: 'Account Payable',
            SUBTITLE: 'Outstanding & aging',
          },
        },
      },
    },
  },
};

const EN_TRANSLATIONS = {
  FINANCIAL_MANAGEMENT_1: {
    EXPENSE_AND_ADVANCE: {
      TITLE: 'Expense and Advance in a Controlled Flow',
      SUBTITLE:
        'Five highlighted areas: employee reimbursement, expense claim, operational advance, supplier advance payment, as well as payment planning & budget control.',
      TABS: {
        REIMBURSEMENT: {
          TITLE: 'Reimbursement',
          SUBTITLE: 'EMPLOYEE REIMBURSEMENT',
        },
        CASH_ADVANCE: {
          TITLE: 'Cash Advance',
          SUBTITLE: 'OPERATIONAL / EMPLOYEE ADVANCE',
        },
      },
      REIMBURSEMENT: {
        FLOW_TITLE: 'From expense claim to payment',
        STEPS: {
          CLAIM_REQUEST: {
            TITLE: 'Claim Request',
            SUBTITLE: 'Purpose & attachment',
          },
          NOTIFICATION: {
            TITLE: 'Notification',
            SUBTITLE: 'Email / WhatsApp',
          },
          LAYERED_APPROVAL: {
            TITLE: 'Layered Approval',
            SUBTITLE: 'Authorization matrix',
          },
          MONITORING: {
            TITLE: 'Monitoring',
            SUBTITLE: 'Status & audit trail',
          },
          PAYMENT: {
            TITLE: 'Payment',
            SUBTITLE: 'Authorized settlement',
          },
          ACCOUNT_PAYABLE: {
            TITLE: 'Account Payable',
            SUBTITLE: 'Outstanding & aging',
          },
        },
      },
    },
  },
};

describe('ExpenseAndAdvance', () => {
  let component: ExpenseAndAdvance;
  let fixture: ComponentFixture<ExpenseAndAdvance>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseAndAdvance],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', ID_TRANSLATIONS);
    translateService.setTranslation('en', EN_TRANSLATIONS);
    translateService.use('id');

    fixture = TestBed.createComponent(ExpenseAndAdvance);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the expense-and-advance section component', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with #expense-advance anchor, tabindex="-1", and aria-labelledby', () => {
    const section = fixture.debugElement.query(By.css('section#expense-advance'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.getAttribute('tabindex')).toBe('-1');
    expect(section.nativeElement.getAttribute('aria-labelledby')).toBe('expense-advance-heading');
    expect(section.nativeElement.classList.contains('expense-advance-section')).toBe(true);
  });

  it('should render translated heading, subtitle, and ribbon title in id and update when switched to en', async () => {
    const h2 = fixture.debugElement.query(By.css('h2#expense-advance-heading'));
    expect(h2).toBeTruthy();
    expect(h2.nativeElement.textContent.trim()).toBe(
      'Expense Dan Advance Dalam Alur Yang Terkontrol',
    );

    const subtitle = fixture.debugElement.query(By.css('section#expense-advance > div > div > p'));
    expect(subtitle.nativeElement.textContent.trim()).toContain(
      'Lima area yang ditonjolkan: employee reimbursement',
    );

    const ribbonHeading = fixture.debugElement.query(By.css('h3#expense-advance-flow-heading'));
    expect(ribbonHeading).toBeTruthy();
    expect(ribbonHeading.nativeElement.textContent.trim()).toBe('Dari expense claim hingga payment');

    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(h2.nativeElement.textContent.trim()).toBe('Expense and Advance in a Controlled Flow');
    expect(subtitle.nativeElement.textContent.trim()).toContain('Five highlighted areas:');
    expect(ribbonHeading.nativeElement.textContent.trim()).toBe('From expense claim to payment');
  });

  it('should render non-interactive Reimbursement (active) and Cash Advance (inactive) shelf tabs without tablist/button ARIA roles', () => {
    expect(fixture.debugElement.query(By.css('[role="tablist"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[role="tab"]'))).toBeNull();
    expect(fixture.debugElement.queryAll(By.css('button')).length).toBe(0);

    const shelfTabs = fixture.debugElement.queryAll(By.css('.expense-shelf-tab'));
    expect(shelfTabs.length).toBe(2);

    expect(shelfTabs[0].nativeElement.getAttribute('data-tab-id')).toBe('reimbursement');
    expect(shelfTabs[0].nativeElement.getAttribute('data-active')).toBe('true');
    expect(shelfTabs[0].nativeElement.classList.contains('expense-shelf-tab--active')).toBe(true);
    expect(shelfTabs[0].nativeElement.textContent).toContain('Reimbursement');
    expect(shelfTabs[0].nativeElement.textContent).toContain('EMPLOYEE REIMBURSEMENT');

    expect(shelfTabs[1].nativeElement.getAttribute('data-tab-id')).toBe('cash-advance');
    expect(shelfTabs[1].nativeElement.getAttribute('data-active')).toBe('false');
    expect(shelfTabs[1].nativeElement.classList.contains('expense-shelf-tab--inactive')).toBe(true);
    expect(shelfTabs[1].nativeElement.textContent).toContain('Cash Advance');
    expect(shelfTabs[1].nativeElement.textContent).toContain('OPERATIONAL / EMPLOYEE ADVANCE');
  });

  it('should render all 6 workflow cards in logical 01-06 DOM order with desktop snake placement classes', () => {
    const list = fixture.debugElement.query(By.css('ol[role="list"]'));
    expect(list).toBeTruthy();
    expect(list.nativeElement.getAttribute('aria-labelledby')).toBe('expense-advance-flow-heading');

    const items = fixture.debugElement.queryAll(By.css('ol[role="list"] > li'));
    expect(items.length).toBe(6);

    const expectedDesktopGridClasses = [
      ['lg:col-start-1', 'lg:row-start-1'],
      ['lg:col-start-2', 'lg:row-start-1'],
      ['lg:col-start-3', 'lg:row-start-1'],
      ['lg:col-start-3', 'lg:row-start-2'],
      ['lg:col-start-2', 'lg:row-start-2'],
      ['lg:col-start-1', 'lg:row-start-2'],
    ];

    const expectedNumbers = ['01', '02', '03', '04', '05', '06'];
    const expectedTitles = [
      'Claim Request',
      'Notification',
      'Layered Approval',
      'Monitoring',
      'Payment',
      'Account Payable',
    ];
    const expectedSubtitles = [
      'Purpose & attachment',
      'Email / WhatsApp',
      'Authorization matrix',
      'Status & audit trail',
      'Authorized settlement',
      'Outstanding & aging',
    ];

    items.forEach((item, index) => {
      const el = item.nativeElement as HTMLElement;
      for (const cls of expectedDesktopGridClasses[index]) {
        expect(el.classList.contains(cls)).toBe(true);
      }

      const badgeText = item.query(By.css('.expense-step-badge span')).nativeElement.textContent.trim();
      const titleText = item.query(By.css('h4')).nativeElement.textContent.trim();
      const subtitleText = item.query(By.css('h4 + p')).nativeElement.textContent.trim();

      expect(badgeText).toBe(expectedNumbers[index]);
      expect(titleText).toBe(expectedTitles[index]);
      expect(subtitleText).toBe(expectedSubtitles[index]);
    });
  });

  it('should render claim-request.svg on card 01 and the 4-layer features/7 composite artwork on cards 02-06 with decorative img attributes', () => {
    const cards = fixture.debugElement.queryAll(By.css('article.expense-step-card'));
    expect(cards.length).toBe(6);

    const card1Images = cards[0].queryAll(By.css('img'));
    expect(card1Images.length).toBe(1);
    const claimImg = card1Images[0].nativeElement as HTMLImageElement;
    expect(claimImg.getAttribute('src')).toBe('/images/landing/features/1/claim-request.svg');
    expect(claimImg.getAttribute('width')).toBe('226');
    expect(claimImg.getAttribute('height')).toBe('194');
    expect(claimImg.getAttribute('alt')).toBe('');
    expect(claimImg.getAttribute('aria-hidden')).toBe('true');

    const expectedLayerSrcs = [
      '/images/landing/features/7/Group 10258.svg',
      '/images/landing/features/7/Group 9458.svg',
      '/images/landing/features/7/Group 9419.svg',
      '/images/landing/features/7/Group 9420.svg',
    ];

    for (let i = 1; i < cards.length; i++) {
      const imgs = cards[i].queryAll(By.css('img'));
      expect(imgs.length).toBe(4);
      imgs.forEach((imgDe, layerIndex) => {
        const img = imgDe.nativeElement as HTMLImageElement;
        expect(img.getAttribute('src')).toBe(expectedLayerSrcs[layerIndex]);
        expect(img.getAttribute('alt')).toBe('');
        expect(img.getAttribute('aria-hidden')).toBe('true');
      });
    }
  });
});
