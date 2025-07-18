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
import { toast } from "sonner";

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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
    form.setValue(name, file);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('http://localhost:3001/api/upload-cv', {
          method: 'POST',
          body: formData,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        if (data.success) {
          setFileName(data.filename);
          toast.success("Dosya başarıyla yüklendi");
        } else {
          throw new Error(data.message || "Dosya yüklenemedi");
        }
      } catch (error) {
        toast.error("Dosya yüklenemedi. Lütfen tekrar deneyin.");
        setFileName("");
        form.setValue(name, undefined);
      }
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem
          className={cn("w-full relative group", {
            "space-y-2": (label?.length ?? 0) > 0,
            "space-y-0": (label?.length ?? 0) === 0,
          })}
        >
          {label && (
            <FormLabel>
              <div className="truncate z-50 justify-start rounded-full items-center border border-dinero-background absolute top-2 bg-dinero-background w-fit h-6 px-[14px] flex left-8 group-hover:bg-dinero-input-hover group-hover:border group-hover:border-dinero-border-light transition-colors duration-200">
                <span className="text-sm font-normal leading-3 text-dinero-text-secondary">
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
                className="flex h-[3.75rem] w-full rounded-full border border-dinero-border-light bg-transparent px-3 py-1 text-base transition-colors cursor-pointer items-center group-hover:bg-dinero-input-hover pl-12"
              >
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Icons.upload />
                </span>
                <span className="ml-0 text-dinero-text-secondary font-normal truncate flex-1">
                  {fileName ? fileName.slice(0, 10) + "..." : "PNG, JPEG, PDF"}
                  <span className="text-xs text-dinero-text-secondary font-normal ml-5">(Maks. Boyut: 1 MB)</span>
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
