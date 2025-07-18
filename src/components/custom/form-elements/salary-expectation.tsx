import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type UseFormReturn } from "react-hook-form";
import React from "react";
import { Icons } from "@/components/icons";

interface SalaryExpectationProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function SalaryExpectation({
  form,
  name,
  label = "Maaş Beklentiniz",
  placeholder = "00,000 ₺",
  disabled,
  onFocus,
}: SalaryExpectationProps) {
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
              <div className="truncate z-50 justify-start rounded-full items-center border border-[#F5F5FF] absolute top-2 bg-[#F5F5FF] w-fit h-6 px-[14px] flex left-8 group-hover:bg-white group-hover:border group-hover:border-[#EAEAFF] transition-colors duration-200">
                <span className="text-sm font-normal leading-3 text-[#5A5A59]">
                  {label}
                </span>
              </div>
            </FormLabel>
          )}
          <FormControl>
            <div className="relative w-full transition-colors py-1 duration-200">
              <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[#3F2F70] text-lg font-bold select-none pointer-events-none">
                <Icons.wallet />
              </div>
              <Input
                placeholder={placeholder}
                disabled={disabled}
                onFocus={onFocus}
                value={
                  field.value
                    ? Number(field.value.replace(/\D/g, '').slice(0, 7)).toLocaleString('tr-TR')
                    : ''
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, '').slice(0, 7);
                  form.setValue(name, raw);
                }}
                className="group-hover:bg-white pl-12 pr-12"
                maxLength={11}
              />
            </div>
          </FormControl>
          <FormMessage className={cn("pt-2")} />
        </FormItem>
      )}
    />
  );
}

export default SalaryExpectation;