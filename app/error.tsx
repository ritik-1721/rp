'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="border border-black dark:border-white p-12 max-w-lg w-full space-y-8">
        <div className="space-y-2">
          <span className="font-label-bold text-label-bold text-muted uppercase tracking-widest block">
            Error
          </span>
          <h1 className="font-sans text-4xl font-bold uppercase tracking-tighter">
            Something broke.
          </h1>
          <p className="font-sans text-body-md text-muted">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
        </div>

        <div className="border-t border-black dark:border-white pt-8 flex gap-4">
          <button
            onClick={reset}
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-label-bold text-label-bold uppercase hover:bg-transparent hover:text-black dark:hover:text-white border border-black dark:border-white transition-all"
            aria-label="Try again"
          >
            Try Again
          </button>
          <a
            href="/"
            className="border border-black dark:border-white px-8 py-4 font-label-bold text-label-bold uppercase hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
