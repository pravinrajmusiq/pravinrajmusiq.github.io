import { lazy, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

const Logo3DSection = lazy(() =>
  import('./Logo3DSection').then((module) => ({ default: module.Logo3DSection }))
);

const placeholderClassName = 'min-h-[85vh] md:min-h-screen bg-[var(--page-bg)]';

export function DeferredLogo3DSection() {
  const [ref, inView] = useInView({ rootMargin: '200px 0px', triggerOnce: true });

  return (
    <div ref={ref} className={placeholderClassName}>
      {inView ? (
        <Suspense fallback={<div className={placeholderClassName} aria-hidden="true" />}>
          <Logo3DSection />
        </Suspense>
      ) : null}
    </div>
  );
}
