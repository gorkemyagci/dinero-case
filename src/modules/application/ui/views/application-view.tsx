import ApplicationModal from "@/components/custom/modals/application-modal";
import { Button } from "@/components/ui/button";

const ApplicationView = () => {
  return (
    <div className="bg-[url('/src/assets/images/background.jpg')] bg-cover bg-center h-screen w-screen flex items-center justify-center bg-black/50 bg-blend-multiply">
      <ApplicationModal jobTitle="Software Engineer">
        <Button className="bg-[#3F2F70] text-white max-w-40 w-full rounded-lg text-lg font-bold h-12 shadow-sm hover:bg-[#4c388a] transition-colors duration-200 border-2 border-[#3F2F70] hover:border-[#FFFFFF] focus:ring-1 focus:ring-[#3F2F70]/50 focus:outline-none">
          Apply Now
        </Button>
      </ApplicationModal>
    </div>
  );
};

export default ApplicationView;
