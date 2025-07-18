import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ToggleSwitch from "../form-elements/toggle-switch";
import ApplyForm from "@/modules/application/ui/components/apply-form";

interface ApplicationModalProps {
  jobTitle: string;
  children: React.ReactNode;
}

const ApplicationModal = ({ children, jobTitle }: ApplicationModalProps) => {
  return (
    <Dialog open>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="bg-[#F5F5FF] max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-4xl w-full flex flex-col gap-5 2xl:gap-14 px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-10 rounded-xl md:rounded-2xl max-h-[90vh] lg:max-h-[95vh] overflow-y-auto"
      >
        <DialogHeader
          className="flex flex-col md:flex-row gap-4 md:gap-[3.75rem] items-start md:items-center justify-between w-full"
        >
          <div className="flex flex-col items-start gap-3 md:gap-5 w-full md:w-auto">
            <DialogTitle className="text-lg md:text-2xl font-bold text-[#3F2F70] tracking-[-1%]">
              {jobTitle} İlanına Başvur
            </DialogTitle>
            <p className="text-[#5A5A59] font-normal leading-[1.5rem] md:leading-[1.875rem] tracking-[-1%] text-xs md:text-base">
              Aşağıdaki bilgileri doldurarak başvurunuzu tamamlayabilirsiniz.
            </p>
          </div>
          <div className="bg-white rounded-full flex items-center gap-2 md:gap-3 px-2 pr-2.5 py-1.5 h-10 md:h-11 w-fit shrink-0 mt-2 md:mt-0">
            <ToggleSwitch />
            <span className="text-xs md:text-sm text-[#1F2937] font-medium tracking-[-0.5%]">
              Adres Bilgilerimi Eklemek İstiyorum.
            </span>
          </div>
        </DialogHeader>
        <ApplyForm />
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
