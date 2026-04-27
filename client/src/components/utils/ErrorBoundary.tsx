import { Component, type ErrorInfo, type ReactNode } from "react";
import { ShieldAlert, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

interface Props { 
  children?: ReactNode; 
}

interface State { 
  hasError: boolean; 
  error: Error | null; 
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { 
    hasError: false, 
    error: null 
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900 p-6 text-center font-sans">
          <ShieldAlert className="w-16 h-16 text-red-500 mb-6" />
          <h1 className="text-4xl font-serif font-medium mb-4 text-slate-800">Something went wrong</h1>
          <p className="text-slate-500 max-w-lg mb-8 text-sm md:text-base leading-relaxed">
            {this.state.error?.message || "An unexpected rendering error occurred. Our team has been notified."}
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="gap-2 rounded-full h-12 px-8 bg-slate-900 text-white hover:bg-slate-800 shadow-md"
          >
            <RefreshCcw className="w-4 h-4" /> 
            Reload Page
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
