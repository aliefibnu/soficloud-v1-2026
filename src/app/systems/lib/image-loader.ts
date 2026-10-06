import { Provider } from '@angular/core';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

export interface ResponsiveVariant {
  readonly maxWidth: number;
  readonly file: string;
}

export const RESPONSIVE_IMAGE_VARIANTS: Record<string, readonly ResponsiveVariant[]> = {
  '/images/overview-feature/computer.webp': [
    { maxWidth: 320, file: '/images/overview-feature/computer-309w.webp' },
  ],
  '/images/overview-feature/glow.webp': [
    { maxWidth: 450, file: '/images/overview-feature/glow-418w.webp' },
  ],
};

export function customImageLoader(config: ImageLoaderConfig): string {
  const variants = RESPONSIVE_IMAGE_VARIANTS[config.src];
  if (variants && config.width) {
    const match = variants.find((variant) => config.width! <= variant.maxWidth);
    if (match) {
      return match.file;
    }
  }
  return config.src;
}

export function provideCustomImageLoader(): Provider {
  return {
    provide: IMAGE_LOADER,
    useValue: customImageLoader,
  };
}
