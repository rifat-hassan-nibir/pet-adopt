/**
 * Enhanced: Added helper text support, required indicator, and character count
 */
"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCharCount,
      className = "",
      id,
      required,
      maxLength,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          maxLength={maxLength}
          value={value}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
            transition-all duration-200 resize-none ${
              error ? "border-red-500 focus:ring-red-500" : ""
            } ${className}`}
          rows={4}
          {...props}
        />
        <div className="flex justify-between mt-1">
          <div>
            {helperText && !error && (
              <p id={`${textareaId}-helper`} className="text-sm text-gray-500">
                {helperText}
              </p>
            )}
            {error && (
              <p
                id={`${textareaId}-error`}
                className="text-sm text-red-500"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>
          {showCharCount && maxLength && (
            <span
              className={`text-xs ${
                charCount >= maxLength ? "text-red-500" : "text-gray-400"
              }`}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
