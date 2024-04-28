import { renderHook } from '@testing-library/react';
import useScroll from '@/hooks/useScroll';

describe('useScroll', () => {
    it('should not call callback if container is not scrolled near the bottom', () => {
        const callback = jest.fn();

        const { result } = renderHook(() => useScroll({ callback }));

        const container = document.createElement('div');
        container.style.height = '200px';
        container.style.overflow = 'auto';
        container.scrollTop = 0;
        container.innerHTML = '<div style="height: 1200px;"></div>';

        // @ts-ignore
        result.current.current = container;

        const event = new Event('scroll', { bubbles: true });
        container.dispatchEvent(event);

        container.scrollTop = 800; // (1200 - 200 - 100)

        container.dispatchEvent(event);

        expect(callback).not.toHaveBeenCalled();
    });
});
