import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface UseTimelineScrollProps {
  loading: boolean;
  hasData: boolean;
  transactionsCount: number;
}

export function useTimelineScroll({
  loading,
  hasData,
  transactionsCount,
}: UseTimelineScrollProps) {
  const [hasAnchored, setHasAnchored] = useState(false);
  const todayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollAdjustmentRef = useRef(false);
  const oldScrollHeightRef = useRef(0);
  const oldScrollTopRef = useRef(0);

  // Scroll para "Hoje" no carregamento inicial
  useEffect(() => {
    if (!loading && hasData && !hasAnchored && todayRef.current) {
      setTimeout(() => {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const elementPosition =
          todayRef.current?.getBoundingClientRect().top || 0;
        const offsetPosition =
          elementPosition + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setHasAnchored(true);
      }, 200);
    }
  }, [loading, hasData, hasAnchored]);

  // Atualiza a variável CSS com a altura do header
  useEffect(() => {
    if (headerRef.current) {
      const updateHeaderHeight = () => {
        const height = headerRef.current?.offsetHeight || 0;
        document.documentElement.style.setProperty(
          '--transactions-header-height',
          `${height}px`,
        );
      };

      updateHeaderHeight();
      window.addEventListener('resize', updateHeaderHeight);
      return () => window.removeEventListener('resize', updateHeaderHeight);
    }
  }, []);

  // Scroll anchoring para quando adicionamos itens no topo (future)
  useLayoutEffect(() => {
    if (scrollAdjustmentRef.current && transactionsCount > 0) {
      const newScrollHeight = document.documentElement.scrollHeight;
      const heightDiff = newScrollHeight - oldScrollHeightRef.current;
      if (heightDiff > 0) {
        window.scrollTo(0, oldScrollTopRef.current + heightDiff);
      }
      scrollAdjustmentRef.current = false;
    }
  }, [transactionsCount]);

  const prepareForFutureLoad = () => {
    oldScrollHeightRef.current = document.documentElement.scrollHeight;
    oldScrollTopRef.current = window.scrollY;
  };

  const applyFutureScrollAdjustment = () => {
    scrollAdjustmentRef.current = true;
  };

  return {
    todayRef,
    headerRef,
    prepareForFutureLoad,
    applyFutureScrollAdjustment,
  };
}
