import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type UseFormReturn } from "react-hook-form";

interface Props
  extends Omit<InputProps, "form" | "name" | "label" | "placeholder"> {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  icon?: React.ReactNode;
}

export function InputElement({
  form,
  name,
  label,
  placeholder,
  disabled,
  onFocus,
  icon,
  ...props
}: Props) {
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
              <div className="truncate z-50 justify-start rounded-full items-center border border-dinero-background absolute top-2 bg-dinero-background group-focus-within:bg-dinero-input-hover w-fit h-6 px-[14px] flex left-8 group-hover:bg-dinero-input-hover group-hover:border group-hover:border-dinero-border-light transition-colors duration-200">
                <span className="text-sm font-normal leading-3 text-dinero-text-secondary">
                  {label}
                </span>
              </div>
            </FormLabel>
          )}
          <FormControl>
            <div className="relative w-full transition-colors py-1 duration-200">
              {icon && <div className="absolute top-1/2 -translate-y-1/2 left-4 text-dinero-text-secondary">{icon}</div>}
              <Input
                placeholder={placeholder}
                disabled={disabled}
                onFocus={(e) => {
                  onFocus?.(e);
                }}
                {...field}
                {...props}
                onChange={field.onChange}
                className="group-hover:bg-dinero-input-hover pl-12"
              />
            </div>
          </FormControl>
          <FormMessage className={cn("pt-2")} />
        </FormItem>
      )}
    />
  );
}

export default InputElement;
