import '@testing-library/jest-dom';

// test/setup.ts
Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', {
    value: () => { },
});
Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', {
    value: () => { },
});
window.HTMLElement.prototype.hasPointerCapture = vi.fn();

// Avoid transform.match errors from vaul
// const originalGetComputedStyle = window.getComputedStyle;

vi.stubGlobal('getComputedStyle', () => {
    return {
      getPropertyValue: (prop: string) => {
        if (prop === 'transform') {
          return 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
        }
        return '';
      },
      transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)',
      // Add fallback style props as needed
    };
  });