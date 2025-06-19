// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { SpiketuneLogo } from './SpiketuneLogo'; // Assuming SpiketuneLogo is in the components folder

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // You could also log the error to an error reporting service here
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex-grow flex flex-col items-center justify-center text-neutral-100 p-6 sm:p-8 text-center bg-neutral-900 min-h-screen">
            <div className="mb-6 sm:mb-8">
                <SpiketuneLogo className="w-20 h-auto sm:w-24 text-purple-500" />
            </div>
            <h1 
                className="text-3xl sm:text-4xl font-bold text-red-500 mb-4"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
                Oops! Something went wrong.
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base mb-6 max-w-md">
                We're sorry, but an unexpected error occurred. Please try reloading the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left bg-neutral-800 p-4 rounded-md w-full max-w-2xl overflow-auto">
                    <summary className="cursor-pointer text-neutral-400 hover:text-neutral-200">Error Details (Development Mode)</summary>
                    <pre className="mt-2 text-xs text-red-300 whitespace-pre-wrap">
                        {this.state.error.toString()}
                        {this.state.error.stack && `\n\nStack Trace:\n${this.state.error.stack}`}
                    </pre>
                </details>
            )}
            <button
                onClick={this.handleReload}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition-colors duration-150 shadow-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-neutral-900"
            >
                Reload Page
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;