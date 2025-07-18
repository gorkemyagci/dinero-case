import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { type UseFormReturn } from "react-hook-form";
import React, { useState } from "react";

interface PhoneNumberProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (!digits) return "";
  let formatted = "";
  if (digits.length > 0) formatted += `(${digits.slice(0, 3)}`;
  if (digits.length >= 3) formatted += ") ";
  if (digits.length >= 4) formatted += digits.slice(3, 6);
  if (digits.length >= 6) formatted += " ";
  if (digits.length >= 6) formatted += digits.slice(6, 8);
  if (digits.length >= 8) formatted += " ";
  if (digits.length >= 8) formatted += digits.slice(8, 10);
  return formatted;
}

export function PhoneNumber({
  form,
  name,
  label = "Telefon Numaranız",
  placeholder = "(5xx) 123 45 67",
  disabled,
  onFocus,
}: PhoneNumberProps) {
  const [displayValue, setDisplayValue] = useState("");

  React.useEffect(() => {
    const digits = form.getValues(name) || "";
    setDisplayValue(formatPhone(digits));
  }, [form, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("w-full relative group", {
            "space-y-2": (label?.length ?? 0) > 0,
            "space-y-0": (label?.length ?? 0) === 0,
          })}
        >
          {label && (
            <FormLabel>
              <div className="truncate z-50 justify-start rounded-full items-center border border-[#F5F5FF] absolute top-2 bg-[#F5F5FF] w-fit h-6 px-[14px] flex left-8 group-hover:bg-white group-hover:border group-hover:border-[#EAEAFF] transition-colors duration-200 group-focus-within:bg-white group-focus-within:border group-focus-within:border-[#EAEAFF]">
                <span className="text-sm font-normal leading-3 text-[#5A5A59]">
                  {label}
                </span>
              </div>
            </FormLabel>
          )}
          <FormControl>
            <div className="relative w-full transition-colors py-1 duration-200">
              <div className="absolute top-1/2 -translate-y-1/2 left-4">
                <Icons.phone />
              </div>
              <Input
                placeholder={placeholder}
                disabled={disabled}
                onFocus={onFocus}
                onChange={e => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setDisplayValue(formatPhone(digits));
                  form.setValue(name, digits);
                  field.onChange(digits);
                }}
                value={displayValue}
                className="group-hover:bg-white pl-12"
                maxLength={15}
              />
            </div>
          </FormControl>
          <FormMessage className={cn("pt-2")} />
        </FormItem>
      )}
    />
  );
}

export default PhoneNumber;