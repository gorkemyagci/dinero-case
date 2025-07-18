import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps {
  className?: string;
  type?: "text" | "password" | "email" | "number" | "file";
  accept?: string;
  placeholder?: string;
  value?: string;
  step?: number;
  id?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  pattern?: string;
  name?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      id = "",
      maxLength,
      pattern,
      onFocus,
      onBlur,
      step,
      name,
      accept,
      required,
      onKeyDown,
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <input
          type={type}
          id={id}
          maxLength={maxLength}
          pattern={pattern}
          className={cn(
            "flex h-[3.75rem] w-full rounded-full border border-[#EAEAFF] bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
            type === "file" && "hidden",
            "hover:bg-dinero-input-hover focus-visible:bg-dinero-input-hover"
          )}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
          step={step}
          name={name}
          accept={accept}
          required={required}
          onKeyDown={onKeyDown}
          onClick={onClick}
          disabled={disabled}
          {...props}
        />

        {type === "file" && (
          <label
            htmlFor={id}
            className={cn(
              "flex h-[3.75rem] z-50 w-full rounded-full border border-[#EAEAFF] bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className
            )}
          />
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export { Input };
