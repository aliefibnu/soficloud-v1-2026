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
        ARIA_LABEL: 'Alur expense dan advance',
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
      CASH_ADVANCE: {
        FLOW_TITLE: 'Dari cash request hingga settlement',
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
        ARIA_LABEL: 'Expense and advance workflows',
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
      CASH_ADVANCE: {
        FLOW_TITLE: 'From cash request to settlement',
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

    const ribbonHeading = fixture.debugElement.query(
      By.css('h3#expense-advance-flow-heading-reimbursement'),
    );
    expect(ribbonHeading).toBeTruthy();
    expect(ribbonHeading.nativeElement.textContent.trim()).toBe('Dari expense claim hingga payment');

    const cashAdvanceHeading = fixture.debugElement.query(
      By.css('h3#expense-advance-flow-heading-cash-advance'),
    );
    expect(cashAdvanceHeading.nativeElement.textContent.trim()).toBe(
      'Dari cash request hingga settlement',
    );

    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(h2.nativeElement.textContent.trim()).toBe('Expense and Advance in a Controlled Flow');
    expect(subtitle.nativeElement.textContent.trim()).toContain('Five highlighted areas:');
    expect(ribbonHeading.nativeElement.textContent.trim()).toBe('From expense claim to payment');
    expect(cashAdvanceHeading.nativeElement.textContent.trim()).toBe(
      'From cash request to settlement',
    );
  });

  it('should render accessible tablist with Reimbursement selected by default and Cash Advance panel hidden until found', () => {
    const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
    expect(tablist).toBeTruthy();
    expect(tablist.nativeElement.getAttribute('aria-label')).toBe('Alur expense dan advance');

    const tabButtons = fixture.debugElement.queryAll(By.css('button[role="tab"]'));
    expect(tabButtons.length).toBe(2);

    const reimbursementBtn = tabButtons[0].nativeElement as HTMLButtonElement;
    const cashAdvanceBtn = tabButtons[1].nativeElement as HTMLButtonElement;

    expect(reimbursementBtn.getAttribute('type')).toBe('button');
    expect(reimbursementBtn.getAttribute('data-tab-id')).toBe('reimbursement');
    expect(reimbursementBtn.getAttribute('aria-selected')).toBe('true');
    expect(reimbursementBtn.getAttribute('tabindex')).toBe('0');
    expect(reimbursementBtn.getAttribute('aria-controls')).toBeNull();
    expect(reimbursementBtn.textContent).toContain('Reimbursement');
    expect(reimbursementBtn.textContent).toContain('EMPLOYEE REIMBURSEMENT');

    expect(cashAdvanceBtn.getAttribute('type')).toBe('button');
    expect(cashAdvanceBtn.getAttribute('data-tab-id')).toBe('cash-advance');
    expect(cashAdvanceBtn.getAttribute('aria-selected')).toBe('false');
    expect(cashAdvanceBtn.getAttribute('tabindex')).toBe('-1');
    expect(cashAdvanceBtn.getAttribute('aria-controls')).toBeNull();
    expect(cashAdvanceBtn.textContent).toContain('Cash Advance');
    expect(cashAdvanceBtn.textContent).toContain('OPERATIONAL / EMPLOYEE ADVANCE');

    const panels = fixture.debugElement.queryAll(By.css('[role="tabpanel"]'));
    expect(panels.length).toBe(2);
    expect(panels[0].nativeElement.getAttribute('aria-labelledby')).toBe('tab-expense-reimbursement');
    expect(panels[0].nativeElement.getAttribute('hidden')).toBeNull();
    expect(panels[0].nativeElement.getAttribute('tabindex')).toBe('0');

    expect(panels[1].nativeElement.getAttribute('aria-labelledby')).toBe('tab-expense-cash-advance');
    expect(panels[1].nativeElement.getAttribute('hidden')).toBe('until-found');
    expect(panels[1].nativeElement.getAttribute('tabindex')).toBeNull();
  });

  it('should switch to Cash Advance on click, keyboard arrows/Home/End, and beforematch', () => {
    const tabButtons = fixture.debugElement.queryAll(By.css('button[role="tab"]'));
    const panels = fixture.debugElement.queryAll(By.css('[role="tabpanel"]'));
    const reimbursementBtn = tabButtons[0].nativeElement as HTMLButtonElement;
    const cashAdvanceBtn = tabButtons[1].nativeElement as HTMLButtonElement;

    cashAdvanceBtn.click();
    fixture.detectChanges();

    expect(component.activeTabId()).toBe('cash-advance');
    expect(cashAdvanceBtn.getAttribute('aria-selected')).toBe('true');
    expect(cashAdvanceBtn.getAttribute('tabindex')).toBe('0');
    expect(reimbursementBtn.getAttribute('aria-selected')).toBe('false');
    expect(reimbursementBtn.getAttribute('tabindex')).toBe('-1');
    expect(panels[1].nativeElement.getAttribute('hidden')).toBeNull();
    expect(panels[1].nativeElement.getAttribute('tabindex')).toBe('0');
    expect(panels[0].nativeElement.getAttribute('hidden')).toBe('until-found');

    const arrowLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true });
    cashAdvanceBtn.dispatchEvent(arrowLeftEvent);
    fixture.detectChanges();
    expect(arrowLeftEvent.defaultPrevented).toBe(true);
    expect(component.activeTabId()).toBe('reimbursement');
    expect(reimbursementBtn.getAttribute('aria-selected')).toBe('true');

    const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true });
    reimbursementBtn.dispatchEvent(arrowDownEvent);
    fixture.detectChanges();
    expect(arrowDownEvent.defaultPrevented).toBe(false);
    expect(component.activeTabId()).toBe('reimbursement');

    const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true });
    reimbursementBtn.dispatchEvent(arrowRightEvent);
    fixture.detectChanges();
    expect(arrowRightEvent.defaultPrevented).toBe(true);
    expect(component.activeTabId()).toBe('cash-advance');

    const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true });
    cashAdvanceBtn.dispatchEvent(arrowUpEvent);
    fixture.detectChanges();
    expect(arrowUpEvent.defaultPrevented).toBe(false);
    expect(component.activeTabId()).toBe('cash-advance');

    const homeEvent = new KeyboardEvent('keydown', { key: 'Home', cancelable: true });
    cashAdvanceBtn.dispatchEvent(homeEvent);
    fixture.detectChanges();
    expect(homeEvent.defaultPrevented).toBe(true);
    expect(component.activeTabId()).toBe('reimbursement');

    const endEvent = new KeyboardEvent('keydown', { key: 'End', cancelable: true });
    reimbursementBtn.dispatchEvent(endEvent);
    fixture.detectChanges();
    expect(endEvent.defaultPrevented).toBe(true);
    expect(component.activeTabId()).toBe('cash-advance');

    homeEvent.stopPropagation();
    cashAdvanceBtn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', cancelable: true }));
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('reimbursement');

    panels[1].nativeElement.dispatchEvent(new Event('beforematch'));
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('cash-advance');
  });

  it('should render all 6 workflow cards in logical 01-06 DOM order with desktop snake placement classes in both panels', () => {
    const panels = fixture.debugElement.queryAll(By.css('[role="tabpanel"]'));
    expect(panels.length).toBe(2);

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

    panels.forEach((panel, panelIndex) => {
      const expectedHeadingId =
        panelIndex === 0
          ? 'expense-advance-flow-heading-reimbursement'
          : 'expense-advance-flow-heading-cash-advance';
      const list = panel.query(By.css('ol[role="list"]'));
      expect(list).toBeTruthy();
      expect(list.nativeElement.getAttribute('aria-labelledby')).toBe(expectedHeadingId);

      const items = panel.queryAll(By.css('ol[role="list"] > li'));
      expect(items.length).toBe(6);

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
  });

  it('should render claim-request.svg on card 01 and the 4-layer features/7 composite artwork on cards 02-06 in both panels', () => {
    const panels = fixture.debugElement.queryAll(By.css('[role="tabpanel"]'));
    expect(panels.length).toBe(2);

    const expectedLayerSrcs = [
      '/images/landing/features/7/Group 10258.svg',
      '/images/landing/features/7/Group 9458.svg',
      '/images/landing/features/7/Group 9419.svg',
      '/images/landing/features/7/Group 9420.svg',
    ];

    panels.forEach((panel) => {
      const cards = panel.queryAll(By.css('article.expense-step-card'));
      expect(cards.length).toBe(6);

      const card1Images = cards[0].queryAll(By.css('img'));
      expect(card1Images.length).toBe(1);
      const claimImg = card1Images[0].nativeElement as HTMLImageElement;
      expect(claimImg.getAttribute('src')).toBe('/images/landing/features/1/claim-request.svg');
      expect(claimImg.getAttribute('width')).toBe('226');
      expect(claimImg.getAttribute('height')).toBe('194');
      expect(claimImg.getAttribute('alt')).toBe('');
      expect(claimImg.getAttribute('aria-hidden')).toBe('true');

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
});
