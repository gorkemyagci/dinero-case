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
import React from "react";

interface UploadFileProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  disabled?: boolean;
}

export function UploadFile({
  form,
  name,
  label = "Dosya Yükle",
  disabled,
}: UploadFileProps) {
  const [fileName, setFileName] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
    form.setValue(name, file);
  };

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
              <Input
                id={name}
                type="file"
                disabled={disabled}
                onChange={handleChange}
                className="hidden"
                accept="image/*, application/pdf"
              />
              <label
                htmlFor={name}
                className="flex h-[3.75rem] w-full rounded-full border border-[#EAEAFF] bg-transparent px-3 py-1 text-base transition-colors cursor-pointer items-center group-hover:bg-white pl-12"
              >
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Icons.upload />
                </span>
                <span className="ml-0 text-[#CECAD7] font-normal truncate flex-1">
                  {fileName ? fileName.slice(0, 10) + "..." : "PNG, JPEG, PDF"}
                  <span className="text-xs text-[#6D6D6D] font-normal ml-5">(Maks. Boyut: 1 MB)</span>
                </span>
              </label>
            </div>
          </FormControl>
          <FormMessage className={cn("pt-2")} />
        </FormItem>
      )}
    />
  );
}

export default UploadFile;
