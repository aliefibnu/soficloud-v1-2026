import { describe, it, expect } from 'vitest';
import { IMAGE_LOADER } from '@angular/common';
import { customImageLoader, provideCustomImageLoader } from './image-loader';

describe('customImageLoader', () => {
  it('should return responsive mobile image for computer.webp when width is 309', () => {
    const result = customImageLoader({
      src: '/images/overview-feature/computer.webp',
      width: 309,
    });
    expect(result).toBe('/images/overview-feature/computer-309w.webp');
  });

  it('should return original computer.webp when width is desktop size 417', () => {
    const result = customImageLoader({
      src: '/images/overview-feature/computer.webp',
      width: 417,
    });
    expect(result).toBe('/images/overview-feature/computer.webp');
  });

  it('should return original computer.webp when width is undefined', () => {
    const result = customImageLoader({
      src: '/images/overview-feature/computer.webp',
    });
    expect(result).toBe('/images/overview-feature/computer.webp');
  });

  it('should return responsive mobile image for glow.webp when width is 418', () => {
    const result = customImageLoader({
      src: '/images/overview-feature/glow.webp',
      width: 418,
    });
    expect(result).toBe('/images/overview-feature/glow-418w.webp');
  });

  it('should return original glow.webp when width is desktop size 521', () => {
    const result = customImageLoader({
      src: '/images/overview-feature/glow.webp',
      width: 521,
    });
    expect(result).toBe('/images/overview-feature/glow.webp');
  });

  it('should return untouched src for unconfigured images', () => {
    const result = customImageLoader({
      src: '/soficloud-logo.svg',
      width: 200,
    });
    expect(result).toBe('/soficloud-logo.svg');
  });

  it('should provide IMAGE_LOADER with customImageLoader function', () => {
    const provider = provideCustomImageLoader() as { provide: unknown; useValue: unknown };
    expect(provider.provide).toBe(IMAGE_LOADER);
    expect(provider.useValue).toBe(customImageLoader);
  });
});
