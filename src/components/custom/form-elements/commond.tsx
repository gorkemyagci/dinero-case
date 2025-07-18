import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { type UseFormReturn } from "react-hook-form";

interface CommandMenuProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  data: any[];
  onSelect?: (value: string) => void;
}

export function CommandMenu({
  form,
  name,
  label,
  placeholder = "Bir komut veya arama yazın...",
  disabled,
  icon,
  data,
  onSelect,
}: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const filtered = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

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
            <div ref={containerRef} className="relative w-full transition-colors py-1 duration-200">
              {icon && <div className="absolute top-1/2 -translate-y-1/2 left-4">{icon}</div>}
              <div onClick={() => setOpen(true)} className="cursor-pointer">
                <input
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setOpen(true);
                  }}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="group-hover:bg-dinero-input-hover pl-12 h-[3.75rem] w-full rounded-full border border-dinero-border-light bg-transparent px-3 py-1 text-base transition-colors focus-visible:outline-none md:text-sm"
                  onFocus={() => setOpen(true)}
                />
              </div>
              {open && (
                <div className="absolute left-0 top-[calc(100%+0.1rem)] z-[99] w-full bg-dinero-input-hover rounded-2xl border border-dinero-border-light shadow-lg">
                  <Command>
                    <CommandList>
                      {filtered.length === 0 ? (
                        <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
                      ) : (
                        <CommandGroup heading="Öneriler">
                          {filtered.map((item) => (
                            <CommandItem
                              key={item}
                              onSelect={() => {
                                form.setValue(name, item);
                                setOpen(false);
                                setSearch(item);
                                onSelect?.(item);
                              }}
                            >
                              {item}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className={cn("pt-2")} />
        </FormItem>
      )}
    />
  );
}

export default CommandMenu;