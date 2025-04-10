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

  // Airplane spinner
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
            <path
              d="M21 16V8C21 5.79086 19.2091 4 17 4H7C4.79086 4 3 5.79086 3 8V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 9H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 20V9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="15"
              cy="15"
              r="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <div className="absolute animate-pulse">
            <svg
              className={cn(
                "text-primary/80",
                size === "sm" ? "w-3 h-3" : size === "md" ? "w-5 h-5" : "w-8 h-8"
              )}
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.59998 17.8C9.38328 17.8 9.17332 17.7414 8.99998 17.6333L3.0333 13.8333C2.8062 13.6843 2.64686 13.4539 2.59116 13.1913C2.53547 12.9287 2.58847 12.6551 2.7333 12.4333L4.9333 9C5.0822 8.77294 5.31252 8.61363 5.57507 8.55798C5.83761 8.50232 6.11116 8.55538 6.33332 8.7L12.3 12.5C12.5271 12.649 12.6864 12.8794 12.7421 13.142C12.7978 13.4046 12.7448 13.6782 12.6 13.9L10.4 17.3333C10.2511 17.5604 10.0208 17.7197 9.75824 17.7754C9.4957 17.8311 9.22214 17.778 9.00001 17.6333L9.59998 17.8Z" />
              <path d="M11.03 7C10.7622 7 10.506 6.88936 10.3185 6.69999L8.01847 4.3C7.74227 4.01379 7.67606 3.59961 7.84231 3.25027C8.00856 2.90094 8.37769 2.67511 8.77997 2.66666L14.78 2.45999C15.1824 2.45129 15.5522 2.6771 15.7189 3.02672C15.8855 3.37633 15.819 3.79004 15.5425 4.07666L11.7425 7.36666C11.5547 7.83249 11.03 7.69999 11.03 7Z" />
            </svg>
          </div>
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