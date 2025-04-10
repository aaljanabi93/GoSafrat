import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "plane" | "compass" | "globe" | "luggage" | "car";
}

export function LoadingSpinner({
  className,
  size = "md",
  variant = "default",
  ...props
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  // Default spinner (circular spinner)
  if (variant === "default") {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <div
          className={cn(
            "animate-spin rounded-full border-4 border-primary border-t-transparent",
            sizeClasses[size]
          )}
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  // Simple airplane spinner
  if (variant === "plane") {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <div className="relative flex items-center justify-center">
          <svg
            className={cn(
              "animate-spin-slow text-primary",
              sizeClasses[size]
            )}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simple circle background */}
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeOpacity="0.3" 
            />
            
            {/* Simple aircraft body */}
            <path
              d="M7 12H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Wings */}
            <path
              d="M12 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Tail */}
            <path
              d="M12 7L15 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  // Compass spinner
  if (variant === "compass") {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <div className="relative">
          <svg
            className={cn(
              "animate-spin-slow text-primary",
              sizeClasses[size]
            )}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="12"
              cy="12"
              r="2"
              fill="currentColor"
            />
            <path
              d="M12 2V4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 20V22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M2 12H4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 12H22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              className={cn(
                "animate-pulse-slow text-primary",
                size === "sm" ? "w-3 h-3" : size === "md" ? "w-5 h-5" : "w-8 h-8"
              )}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8L16 16H8L12 8Z"
                fill="currentColor"
                className="animate-direction-spin"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Globe spinner
  if (variant === "globe") {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <div className="relative">
          <svg
            className={cn(
              "animate-spin-slow text-primary",
              sizeClasses[size]
            )}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="1 3"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M2 12H22"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M12 2V22"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <svg
              className={cn(
                "animate-bounce-slow text-primary",
                size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
              )}
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12Z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Luggage spinner
  if (variant === "luggage") {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <div className="relative">
          <svg
            className={cn(
              "animate-bounce-slow text-primary",
              sizeClasses[size]
            )}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4"
              y="8"
              width="16"
              height="12"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 8V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 14H16.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 20V22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M16 20V22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  // Car spinner
  if (variant === "car") {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <div className="relative">
          <svg
            className={cn(
              "animate-car-move text-primary",
              sizeClasses[size]
            )}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 17H5V13L8 6H16L19 13V17Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="7.5" cy="17.5" r="1.5" fill="currentColor">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 7.5 17.5"
                to="360 7.5 17.5"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="16.5" cy="17.5" r="1.5" fill="currentColor">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 16.5 17.5"
                to="360 16.5 17.5"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>
    );
  }

  // Default fallback if variant not recognized
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-4 border-primary border-t-transparent",
          sizeClasses[size]
        )}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

// Wrapper to add text label to any spinner
export function LoadingSpinnerWithText({
  text,
  spinnerProps,
  className,
  textClassName,
  ...props
}: {
  text: string;
  spinnerProps?: LoadingSpinnerProps;
  className?: string;
  textClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)} {...props}>
      <LoadingSpinner {...spinnerProps} className="mb-2" />
      <p className={cn("text-sm text-center text-gray-600", textClassName)}>{text}</p>
    </div>
  );
}