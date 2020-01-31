import React, { ErrorInfo } from 'react';

class ErrorBoundary extends React.Component {
    public state = { hasError: false, redirect: false };

    public static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log("ErrorBoundary caught an error", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        } else {
            return this.props.children;
        }
    }
}

export { ErrorBoundary };
