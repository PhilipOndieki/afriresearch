'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-prose">
        <p className="label-text mb-4">Something went wrong</p>
        <h1 className="font-serif text-display-md text-foreground mb-6">An error occurred</h1>
        <p className="text-body-md text-muted mb-8">
          We could not load this page. Please try again or contact us if the problem persists.
        </p>
        <button onClick={reset} className="btn-primary">
          Try again
        </button>
      </div>
    </div>
  );
}
