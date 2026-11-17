import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';
import { ExploreTheLook } from './explore-the-look';

describe('ExploreTheLook', () => {
  let fixture: ComponentFixture<ExploreTheLook>;
  let component: ExploreTheLook;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreTheLook],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      SMART_WORKFLOW: {
        EXPLORE_THE_LOOK: {
          TITLE: 'Dari Pengaturan Akses\nHingga Pemberitahuan',
          DESCRIPTION:
            'Pilih contoh transaksi untuk melihat bagaimana modul saling meneruskan informasi. Setiap tahap memiliki\ndokumen dan tujuan yang berbeda.',
          TABLIST_ARIA_LABEL: 'Tahapan alur kerja cerdas',
          TABS: {
            KEWENANGAN: { NAME: 'Kewenangan', SUBTITLE: 'Strategi Izin Akses' },
            STATUS_APPROVAL: {
              NAME: 'Status Persetujuan',
              SUBTITLE: 'Pelacakan Status Persetujuan',
            },
            RIWAYAT: { NAME: 'Riwayat', SUBTITLE: 'Riwayat Persetujuan' },
            NOTIFIKASI: { NAME: 'Notifikasi', SUBTITLE: 'Email dan WhatsApp' },
          },
          PERMISSION_STRATEGY: {
            CONTEXT: {
              ACCESS_GROUP: { LABEL: 'Grup Akses', VALUE: 'Manajer Akuntansi' },
              ACCESS_CATEGORY: { LABEL: 'Kategori Akses', VALUE: 'Transaksi' },
              ACCESS_ITEM: { LABEL: 'Item Akses', VALUE: 'Pesanan Pembelian' },
            },
            FORM_ENTRY: {
              TITLE: 'Entri Formulir',
              ITEMS: {
                READ: 'Baca',
                ADD: 'Tambah',
                EDIT: 'Ubah',
                DELETE: 'Hapus',
                PRINT: 'Cetak',
                EXPORT: 'Ekspor',
              },
            },
            STATUS_CHANGE: {
              TITLE: 'Izin perubahan status',
              ITEMS: {
                ENTRY_CONFIRM: 'Konfirmasi Entri',
                RUN_REVISE: 'Jalankan Revisi',
                ENTRY_VERIFY: 'Verifikasi Entri',
                RUN_CANCEL: 'Jalankan Batal',
              },
            },
            AMOUNT_RANGE: {
              TITLE: 'Rentang nominal',
              FROM_LABEL: 'Nominal Dari',
              FROM_VALUE: 'Rp 0',
              TO_LABEL: 'Nominal Sampai',
              TO_VALUE: 'Rp 10.000.000',
            },
            STATE_CHECKED: 'Aktif',
            STATE_UNCHECKED: 'Tidak aktif',
            CALLOUT: {
              LEAD: 'Kontrol sesuai kebutuhan',
              TEXT: 'Sesuaikan kewenangan per Grup Akses dan item transaksi, lalu tetapkan urutan pengguna pada Urutan Persetujuan.',
            },
          },
          PLACEHOLDER: {
            NOTICE: 'Pratinjau tampilan untuk tahap ini akan segera tersedia.',
          },
        },
      },
    });
    translateService.setTranslation('en', {
      SMART_WORKFLOW: {
        EXPLORE_THE_LOOK: {
          TITLE: 'From Access Settings\nTo Notifications',
          DESCRIPTION:
            'Select a transaction example to see how modules pass information along. Each stage has\ndifferent documents and objectives.',
          TABLIST_ARIA_LABEL: 'Smart workflow view stages',
          TABS: {
            KEWENANGAN: { NAME: 'Authority', SUBTITLE: 'Permission Strategy' },
            STATUS_APPROVAL: { NAME: 'Approval Status', SUBTITLE: 'Approval Status Tracking' },
            RIWAYAT: { NAME: 'History', SUBTITLE: 'Approval History' },
            NOTIFIKASI: { NAME: 'Notifications', SUBTITLE: 'Email and WhatsApp' },
          },
          PERMISSION_STRATEGY: {
            CONTEXT: {
              ACCESS_GROUP: { LABEL: 'Access Group', VALUE: 'Accounting Manager' },
              ACCESS_CATEGORY: { LABEL: 'Access Category', VALUE: 'Transaction' },
              ACCESS_ITEM: { LABEL: 'Access Item', VALUE: 'Purchase Order' },
            },
            FORM_ENTRY: {
              TITLE: 'Form Entry',
              ITEMS: {
                READ: 'Read',
                ADD: 'Add',
                EDIT: 'Edit',
                DELETE: 'Delete',
                PRINT: 'Print',
                EXPORT: 'Export',
              },
            },
            STATUS_CHANGE: {
              TITLE: 'Status change permissions',
              ITEMS: {
                ENTRY_CONFIRM: 'Entry-Confirm',
                RUN_REVISE: 'Run-Revise',
                ENTRY_VERIFY: 'Entry-Verify',
                RUN_CANCEL: 'Run-Cancel',
              },
            },
            AMOUNT_RANGE: {
              TITLE: 'Amount range',
              FROM_LABEL: 'Amount From',
              FROM_VALUE: 'Rp 0',
              TO_LABEL: 'Amount To',
              TO_VALUE: 'Rp 10,000,000',
            },
            STATE_CHECKED: 'Enabled',
            STATE_UNCHECKED: 'Disabled',
            CALLOUT: {
              LEAD: 'Control tailored to your needs',
              TEXT: 'Configure permissions per Access Group and transaction item, then assign user order in the Approval Sequence.',
            },
          },
          PLACEHOLDER: {
            NOTICE: 'The visual preview for this stage will be available soon.',
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(ExploreTheLook);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should wrap content inside ProcessSectionShell with id="jelajahi-tampilan" and localized header', () => {
    const shell = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shell).toBeTruthy();

    const shellComponent = shell.componentInstance as ProcessSectionShell;
    expect(shellComponent.sectionId()).toBe('jelajahi-tampilan');
    expect(shellComponent.title()).toBe('Dari Pengaturan Akses\nHingga Pemberitahuan');
    expect(shellComponent.stageBgClass()).toBe(
      'bg-[linear-gradient(322.37deg,#EDF3FB_-7.13%,#BDD2F6_42%,#C3D7F7_96.88%)]',
    );

    expect(fixture.debugElement.query(By.css('section#jelajahi-tampilan'))).toBeTruthy();
  });

  it('should render 4 shelf tabs with Kewenangan active by default', () => {
    const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(tabButtons.length).toBe(4);

    expect(
      tabButtons.map((btn) =>
        btn.query(By.css('span')).nativeElement.textContent.trim(),
      ),
    ).toEqual(['Kewenangan', 'Status Persetujuan', 'Riwayat', 'Notifikasi']);

    expect(tabButtons[0].nativeElement.getAttribute('aria-selected')).toBe('true');
    expect(tabButtons[0].nativeElement.getAttribute('tabindex')).toBe('0');
    for (let i = 1; i < tabButtons.length; i++) {
      expect(tabButtons[i].nativeElement.getAttribute('aria-selected')).toBe('false');
      expect(tabButtons[i].nativeElement.getAttribute('tabindex')).toBe('-1');
    }
  });

  it('should style shelf tabs to match Figma with flush-left alignment, equal desktop flex tracks, rounded top corners, and muted inactive text', () => {
    const shelf = fixture.debugElement.query(By.css('[shell-shelf]')).nativeElement as HTMLElement;
    expect(shelf.className).toContain('pl-0');
    expect(shelf.className).toContain('mb-0');

    const tabs = fixture.debugElement.queryAll(By.css('button[role="tab"]'));
    const selectedTab = tabs[0].nativeElement as HTMLElement;
    const unselectedTab = tabs[1].nativeElement as HTMLElement;

    expect(selectedTab.className).toContain('bg-[#FDFDFD]');
    expect(selectedTab.className).toContain('lg:flex-1');
    expect(selectedTab.className).toContain('z-20');

    expect(unselectedTab.className).toContain('bg-[#FDFDFD]');
    expect(unselectedTab.className).toContain('sm:rounded-t-3xl');
    expect(unselectedTab.className).toContain('lg:flex-1');
    expect(unselectedTab.className).toContain('z-10');

    const selectedSub = tabs[0].query(By.css('span.font-normal')).nativeElement as HTMLElement;
    expect(selectedSub.className).toContain('text-[#23244E]');

    const unselectedTitle = tabs[1].query(By.css('span.font-bold')).nativeElement as HTMLElement;
    expect(unselectedTitle.className).toContain('text-[#BABABA]');

    const unselectedSub = tabs[1].query(By.css('span.font-normal')).nativeElement as HTMLElement;
    expect(unselectedSub.className).toContain('text-[#BABABA]');
  });

  it('should display localized context fields, permissions, amount range, and callout for Kewenangan', () => {
    const contextGrid = fixture.debugElement.query(By.css('[data-testid="access-context-grid"]'));
    expect(contextGrid.nativeElement.textContent).toContain('Grup Akses');
    expect(contextGrid.nativeElement.textContent).toContain('Manajer Akuntansi');
    expect(contextGrid.nativeElement.textContent).toContain('Kategori Akses');
    expect(contextGrid.nativeElement.textContent).toContain('Transaksi');
    expect(contextGrid.nativeElement.textContent).toContain('Item Akses');
    expect(contextGrid.nativeElement.textContent).toContain('Pesanan Pembelian');

    const formEntryItems = fixture.debugElement.queryAll(
      By.css('[data-testid="form-entry-column"] li'),
    );
    expect(formEntryItems.length).toBe(6);
    expect(formEntryItems[0].nativeElement.textContent).toContain('Baca');
    expect(formEntryItems[0].nativeElement.textContent).toContain('Aktif');
    expect(formEntryItems[3].nativeElement.textContent).toContain('Hapus');
    expect(formEntryItems[3].nativeElement.textContent).toContain('Tidak aktif');

    const statusChangeItems = fixture.debugElement.queryAll(
      By.css('[data-testid="status-change-column"] li'),
    );
    expect(statusChangeItems.length).toBe(4);
    expect(statusChangeItems[0].nativeElement.textContent).toContain('Konfirmasi Entri');
    expect(statusChangeItems[2].nativeElement.textContent).toContain('Verifikasi Entri');

    const amountRange = fixture.debugElement.query(By.css('[data-testid="amount-range-column"]'));
    expect(amountRange.nativeElement.textContent).toContain('Nominal Dari');
    expect(amountRange.nativeElement.textContent).toContain('Rp 0');
    expect(amountRange.nativeElement.textContent).toContain('Nominal Sampai');
    expect(amountRange.nativeElement.textContent).toContain('Rp 10.000.000');

    const callout = fixture.debugElement.query(By.css('[data-testid="explore-look-callout"]'));
    expect(callout.nativeElement.textContent).toContain('Kontrol sesuai kebutuhan');
    expect(callout.nativeElement.textContent).toContain('Urutan Persetujuan.');
  });

  it('should switch visible tabpanel when clicking another shelf tab', async () => {
    const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    const panels = fixture.debugElement.queryAll(By.css('[role="tabpanel"]'));

    expect(panels[0].nativeElement.hasAttribute('hidden')).toBe(false);
    expect(panels[1].nativeElement.getAttribute('hidden')).toBe('until-found');

    tabButtons[1].nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.selectedTab()).toBe('status-approval');
    expect(tabButtons[1].nativeElement.getAttribute('aria-selected')).toBe('true');
    expect(panels[0].nativeElement.getAttribute('hidden')).toBe('until-found');
    expect(panels[1].nativeElement.hasAttribute('hidden')).toBe(false);
    expect(panels[1].nativeElement.textContent).toContain('Pelacakan Status Persetujuan');
  });

  it('should support keyboard navigation with ArrowRight, ArrowLeft, End, and Home', async () => {
    const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));

    tabButtons[0].triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowRight' }),
    );
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.selectedTab()).toBe('status-approval');

    tabButtons[1].triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'End' }),
    );
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.selectedTab()).toBe('notifikasi');

    tabButtons[3].triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'ArrowLeft' }),
    );
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.selectedTab()).toBe('riwayat');

    tabButtons[2].triggerEventHandler(
      'keydown',
      new KeyboardEvent('keydown', { key: 'Home' }),
    );
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.selectedTab()).toBe('kewenangan');
  });

  it('should update rendered labels when language changes to English', async () => {
    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    const shellComponent = fixture.debugElement.query(By.directive(ProcessSectionShell))
      .componentInstance as ProcessSectionShell;
    expect(shellComponent.title()).toBe('From Access Settings\nTo Notifications');

    const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(
      tabButtons.map((btn) =>
        btn.query(By.css('span')).nativeElement.textContent.trim(),
      ),
    ).toEqual(['Authority', 'Approval Status', 'History', 'Notifications']);

    const callout = fixture.debugElement.query(By.css('[data-testid="explore-look-callout"]'));
    expect(callout.nativeElement.textContent).toContain('Control tailored to your needs');

    const contextGrid = fixture.debugElement.query(By.css('[data-testid="access-context-grid"]'));
    expect(contextGrid.nativeElement.textContent).toContain('Purchase Order');

    const amountRange = fixture.debugElement.query(By.css('[data-testid="amount-range-column"]'));
    expect(amountRange.nativeElement.textContent).toContain('Rp 10,000,000');
  });

  it('should localize tab subtitles, context fields, permissions, and amount labels in zh, ko, and ja', async () => {
    translateService.setTranslation('zh', {
      SMART_WORKFLOW: {
        EXPLORE_THE_LOOK: {
          TITLE: '从权限配置\n到消息通知',
          DESCRIPTION: '选择交易示例',
          TABLIST_ARIA_LABEL: '智能工作流界面阶段',
          TABS: {
            KEWENANGAN: { NAME: '权限配置', SUBTITLE: '权限策略' },
            STATUS_APPROVAL: { NAME: '审批状态', SUBTITLE: '审批状态跟踪' },
            RIWAYAT: { NAME: '审批记录', SUBTITLE: '审批历史' },
            NOTIFIKASI: { NAME: '通知提醒', SUBTITLE: '邮件与 WhatsApp' },
          },
          PERMISSION_STRATEGY: {
            CONTEXT: {
              ACCESS_GROUP: { LABEL: '权限组', VALUE: '会计经理' },
              ACCESS_CATEGORY: { LABEL: '访问类别', VALUE: '业务交易' },
              ACCESS_ITEM: { LABEL: '访问项目', VALUE: '采购订单' },
            },
            FORM_ENTRY: {
              TITLE: '表单录入',
              ITEMS: {
                READ: '查看',
                ADD: '新增',
                EDIT: '修改',
                DELETE: '删除',
                PRINT: '打印',
                EXPORT: '导出',
              },
            },
            STATUS_CHANGE: {
              TITLE: '状态变更权限',
              ITEMS: {
                ENTRY_CONFIRM: '录入确认',
                RUN_REVISE: '执行修订',
                ENTRY_VERIFY: '录入核验',
                RUN_CANCEL: '执行取消',
              },
            },
            AMOUNT_RANGE: {
              TITLE: '金额范围',
              FROM_LABEL: '起始金额',
              FROM_VALUE: 'Rp 0',
              TO_LABEL: '上限金额',
              TO_VALUE: 'Rp 10,000,000',
            },
            STATE_CHECKED: '已启用',
            STATE_UNCHECKED: '未启用',
            CALLOUT: {
              LEAD: '按需精细管控',
              TEXT: '按权限组与交易项目配置权限，并在审批流程中设定审批人员顺序。',
            },
          },
          PLACEHOLDER: { NOTICE: '该阶段的界面预览即将推出。' },
        },
      },
    });
    translateService.setTranslation('ko', {
      SMART_WORKFLOW: {
        EXPLORE_THE_LOOK: {
          TITLE: '접근 권한 설정부터\n알림 발송까지',
          DESCRIPTION: '거래 예시를 선택하세요',
          TABLIST_ARIA_LABEL: '스마트 워크플로우 화면 단계',
          TABS: {
            KEWENANGAN: { NAME: '권한 설정', SUBTITLE: '권한 전략' },
            STATUS_APPROVAL: { NAME: '결재 상태', SUBTITLE: '결재 상태 추적' },
            RIWAYAT: { NAME: '이력', SUBTITLE: '결재 이력' },
            NOTIFIKASI: { NAME: '알림', SUBTITLE: '이메일 및 WhatsApp' },
          },
          PERMISSION_STRATEGY: {
            CONTEXT: {
              ACCESS_GROUP: { LABEL: '접근 그룹', VALUE: '회계 관리자' },
              ACCESS_CATEGORY: { LABEL: '접근 카테고리', VALUE: '거래' },
              ACCESS_ITEM: { LABEL: '접근 항목', VALUE: '발주서' },
            },
            FORM_ENTRY: {
              TITLE: '양식 입력',
              ITEMS: {
                READ: '조회',
                ADD: '등록',
                EDIT: '수정',
                DELETE: '삭제',
                PRINT: '인쇄',
                EXPORT: '내보내기',
              },
            },
            STATUS_CHANGE: {
              TITLE: '상태 변경 권한',
              ITEMS: {
                ENTRY_CONFIRM: '입력 확정',
                RUN_REVISE: '수정 실행',
                ENTRY_VERIFY: '입력 검증',
                RUN_CANCEL: '취소 실행',
              },
            },
            AMOUNT_RANGE: {
              TITLE: '금액 범위',
              FROM_LABEL: '시작 금액',
              FROM_VALUE: 'Rp 0',
              TO_LABEL: '상한 금액',
              TO_VALUE: 'Rp 10,000,000',
            },
            STATE_CHECKED: '활성',
            STATE_UNCHECKED: '비활성',
            CALLOUT: {
              LEAD: '필요에 맞춘 정밀한 제어',
              TEXT: '접근 그룹 및 거래 항목별로 권한을 조정한 뒤 결재 순서에서 사용자 순서를 지정하세요.',
            },
          },
          PLACEHOLDER: { NOTICE: '이 단계의 화면 미리보기는 곧 제공될 예정입니다.' },
        },
      },
    });
    translateService.setTranslation('ja', {
      SMART_WORKFLOW: {
        EXPLORE_THE_LOOK: {
          TITLE: 'アクセス設定から\n通知配信まで',
          DESCRIPTION: '取引例を選択してください',
          TABLIST_ARIA_LABEL: 'スマートワークフロー表示ステージ',
          TABS: {
            KEWENANGAN: { NAME: '権限設定', SUBTITLE: '権限戦略' },
            STATUS_APPROVAL: { NAME: '承認ステータス', SUBTITLE: '承認ステータス追跡' },
            RIWAYAT: { NAME: '承認履歴', SUBTITLE: '承認履歴' },
            NOTIFIKASI: { NAME: '通知', SUBTITLE: 'メール・WhatsApp' },
          },
          PERMISSION_STRATEGY: {
            CONTEXT: {
              ACCESS_GROUP: { LABEL: 'アクセスグループ', VALUE: '経理マネージャー' },
              ACCESS_CATEGORY: { LABEL: 'アクセスカテゴリ', VALUE: '取引' },
              ACCESS_ITEM: { LABEL: 'アクセス項目', VALUE: '購買発注' },
            },
            FORM_ENTRY: {
              TITLE: 'フォーム入力',
              ITEMS: {
                READ: '閲覧',
                ADD: '追加',
                EDIT: '編集',
                DELETE: '削除',
                PRINT: '印刷',
                EXPORT: 'エクスポート',
              },
            },
            STATUS_CHANGE: {
              TITLE: 'ステータス変更権限',
              ITEMS: {
                ENTRY_CONFIRM: '入力確定',
                RUN_REVISE: '修正実行',
                ENTRY_VERIFY: '入力検証',
                RUN_CANCEL: '取消実行',
              },
            },
            AMOUNT_RANGE: {
              TITLE: '金額範囲',
              FROM_LABEL: '開始金額',
              FROM_VALUE: 'Rp 0',
              TO_LABEL: '上限金額',
              TO_VALUE: 'Rp 10,000,000',
            },
            STATE_CHECKED: '有効',
            STATE_UNCHECKED: '無効',
            CALLOUT: {
              LEAD: '要件に応じた柔軟な制御',
              TEXT: 'アクセスグループと取引項目ごとに権限を調整し、承認順序で担当者の順番を設定します。',
            },
          },
          PLACEHOLDER: { NOTICE: 'このステージの画面プレビューは近日公開予定です。' },
        },
      },
    });

    const cases = [
      { lang: 'zh', subtitle: '权限策略', group: '会计经理', formTitle: '表单录入', statusItem: '录入确认', fromLabel: '起始金额' },
      { lang: 'ko', subtitle: '권한 전략', group: '회계 관리자', formTitle: '양식 입력', statusItem: '입력 확정', fromLabel: '시작 금액' },
      { lang: 'ja', subtitle: '権限戦略', group: '経理マネージャー', formTitle: 'フォーム入力', statusItem: '入力確定', fromLabel: '開始金額' },
    ] as const;

    for (const c of cases) {
      translateService.use(c.lang);
      fixture.detectChanges();
      await fixture.whenStable();

      const firstTabSub = fixture.debugElement.queryAll(By.css('[role="tab"] span.font-normal'))[0];
      expect(firstTabSub.nativeElement.textContent.trim()).toBe(c.subtitle);
      expect(fixture.debugElement.query(By.css('[data-testid="access-context-grid"]')).nativeElement.textContent).toContain(c.group);
      expect(fixture.debugElement.query(By.css('[data-testid="form-entry-column"]')).nativeElement.textContent).toContain(c.formTitle);
      expect(fixture.debugElement.query(By.css('[data-testid="status-change-column"]')).nativeElement.textContent).toContain(c.statusItem);
      expect(fixture.debugElement.query(By.css('[data-testid="amount-range-column"]')).nativeElement.textContent).toContain(c.fromLabel);
    }
  });
});
