import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../systems/lib/language.service';

export interface BusinessModelCard {
  readonly id: string;
  readonly number: string;
  readonly titleKey: string;
  readonly descKey: string;
  readonly image: string;
  readonly width: number;
  readonly height: number;
}

@Component({
  selector: 'app-business-model',
  imports: [NgTemplateOutlet, TranslatePipe],
  templateUrl: './business-model.html',
  styleUrl: './business-model.css',
  host: {
    class: 'block w-full',
  },
})
export class BusinessModel {
  protected readonly languageService = inject(LanguageService);

  readonly leftCards: readonly BusinessModelCard[] = [
    {
      id: 'manufacturing',
      number: '01',
      titleKey: 'BUSINESS_MODEL.CARDS.MANUFACTURING.TITLE',
      descKey: 'BUSINESS_MODEL.CARDS.MANUFACTURING.DESC',
      image: '/images/business-model/manufacturing.svg',
      width: 223,
      height: 156,
    },
    {
      id: 'distribution',
      number: '02',
      titleKey: 'BUSINESS_MODEL.CARDS.DISTRIBUTION.TITLE',
      descKey: 'BUSINESS_MODEL.CARDS.DISTRIBUTION.DESC',
      image: '/images/business-model/distribution-trading.svg',
      width: 219,
      height: 145,
    },
  ];

  readonly rightCards: readonly BusinessModelCard[] = [
    {
      id: 'construction',
      number: '03',
      titleKey: 'BUSINESS_MODEL.CARDS.CONSTRUCTION.TITLE',
      descKey: 'BUSINESS_MODEL.CARDS.CONSTRUCTION.DESC',
      image: '/images/business-model/construction-project.svg',
      width: 189,
      height: 181,
    },
    {
      id: 'services',
      number: '04',
      titleKey: 'BUSINESS_MODEL.CARDS.SERVICES.TITLE',
      descKey: 'BUSINESS_MODEL.CARDS.SERVICES.DESC',
      image: '/images/business-model/services.svg',
      width: 212,
      height: 145,
    },
  ];
}
