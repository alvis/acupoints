'use client';

import { useEffect } from 'react';

import { ErrorView } from './components/ErrorView';

/** Props Next passes an error boundary. */
export type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Error boundary for the locale subtree, drawn as a damaged block (版損).
 * @param props rendering error and the action that retries the locale subtree
 * @param props.error rendering error reported to the browser console
 * @param props.reset action that retries rendering the locale subtree
 */
const ErrorPage = ({ error, reset }: Readonly<ErrorPageProps>): React.JSX.Element => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorView onRetry={reset} />;
};

export default ErrorPage;
