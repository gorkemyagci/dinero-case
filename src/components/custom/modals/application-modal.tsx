import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ToggleSwitch from "../form-elements/toggle-switch";
import ApplyForm from "@/modules/application/ui/components/apply-form";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useCurrentTheme } from "@/hooks/use-current-theme";

interface ApplicationModalProps {
  jobTitle: string;
  children: React.ReactNode;
}

const ApplicationModal = ({ children, jobTitle }: ApplicationModalProps) => {
  const [address, setAddress] = useState(false);
  const { theme, setTheme } = useCurrentTheme();
  const isDark = theme === "dark";

  const toggleDarkMode = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Dialog open>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="bg-dinero-background max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-4xl w-full flex flex-col gap-5 2xl:gap-14 px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-10 md:rounded-2xl max-h-screen rounded-none lg:max-h-[95vh] overflow-y-auto scrollbar-hide"
      >
        <DialogHeader
          className="flex flex-col md:flex-row gap-4 md:gap-[3.75rem] items-start md:items-center justify-between w-full"
        >
          <div className="flex flex-col items-start gap-3 md:gap-5 w-full md:w-auto">
            <DialogTitle className="text-lg md:text-2xl font-bold text-dinero-text-primary tracking-[-1%]">
              {jobTitle} İlanına Başvur
            </DialogTitle>
            <p className="text-dinero-text-secondary font-normal leading-[1.5rem] md:leading-[1.875rem] tracking-[-1%] text-xs md:text-base">
              Aşağıdaki bilgileri doldurarak başvurunuzu tamamlayabilirsiniz.
            </p>
          </div>
          <div className="flex flex-row gap-3 items-end md:flex-col">
            <button
              onClick={toggleDarkMode}
              className="rounded-full p-2 bg-dinero-white cursor-pointer border border-dinero-border-light hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-dinero-text-primary" />}
            </button>
            <div className="bg-dinero-white rounded-full flex items-center gap-2 md:gap-3 px-2 pr-2.5 py-1.5 h-10 md:h-11 w-fit shrink-0 mt-2 md:mt-0">
              <ToggleSwitch checked={address} onCheckedChange={setAddress} />
              <span className="text-xs md:text-sm text-dinero-text-dark font-medium tracking-[-0.5%]">
                Adres Bilgilerimi Eklemek İstiyorum.
              </span>
            </div>
          </div>
        </DialogHeader>
        <ApplyForm address={address} />
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
