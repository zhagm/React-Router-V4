import React, { Component } from "react";

/**
 * REMINDER THAT ERROR BOUNDARIES DO NOT CATCH THE FOLLOWING ERRORS
 * Event handlers (learn more)
 * Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
 * Server side rendering
 * Errors thrown in the error boundary itself (rather than its children)
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error({ error });
    console.error({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong!</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
