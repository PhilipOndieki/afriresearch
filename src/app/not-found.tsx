import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-prose">
        <p className="label-text mb-4">404</p>
        <h1 className="font-serif text-display-md text-foreground mb-6">Page not found</h1>
        <p className="text-body-md text-muted mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
