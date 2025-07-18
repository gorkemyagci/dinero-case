import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InputElement from "@/components/custom/form-elements/input";
import { Icons } from "@/components/icons";
import { PhoneNumber } from "@/components/custom/form-elements/phone-number";
import UploadFile from "@/components/custom/form-elements/upload-file";
import SalaryExpectation from "@/components/custom/form-elements/salary-expectation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CommandMenu from "@/components/custom/form-elements/commond";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { submit } from "@/api-store/global";
import type { CustomError } from "@/api-store";
import type { ApplicationForm } from "@/lib/types";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/loadingAnimation.json";
import successAnimation from "@/assets/animations/successAnimation.json";
import { useState } from "react";
import { getCities, getDistrictsByCity } from "@/lib/mockData";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  linkedin: z.string().min(1),
  salaryExpectation: z.string().min(1),
  file: z.instanceof(File),
  province: z.string().optional(),
  district: z.string().optional(),
  address: z.string().optional(),
});

const ApplyForm = ({ address }: { address: boolean }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedin: "",
      salaryExpectation: "",
      file: undefined,
      province: "",
      district: "",
      address: "",
    },
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const cities = getCities();
  const districts = selectedCity ? getDistrictsByCity(selectedCity) : [];

  const { mutate: submitMutation, isPending } = useMutation({
    mutationFn: async (data: ApplicationForm) => await submit(data),
    onSuccess: (response) => {
      toast.success(response.message || "Başvurunuz başarıyla gönderildi");
      form.reset();
      setShowSuccess(true);
    },
    onError: (error: CustomError) => {
      const errorMessage = error.info?.message || error.message || "Bir hata oluştu";
      
      if (error.info?.status === 401 || error.info?.status === 403) {
        toast.error(errorMessage);
      } else if (error.info?.status === 0 || error.info?.status === 404) {
        toast.error(errorMessage);
      } else if (error.info?.status >= 500) {
        toast.error("Sunucu hatası. Lütfen daha sonra tekrar deneyin.");
      } else {
        toast.error(errorMessage);
      }
    },
  });



  const handleCityChange = (cityName: string): void => {
    setSelectedCity(cityName);
    form.setValue("province", cityName);
    form.setValue("district", "");
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submitMutation({
      firstName: data.firstName,
      lastName: data.lastName,
      telephone: data.phone,
      linkedinUrl: data.linkedin,
      cv: data.file?.name || "",
      salaryExpectation: Number(data.salaryExpectation),
      province: data.province || "",
      district: data.district || "",
      address: address ? data.address || "" : "",
      eMail: data.email,
    });
  };

  return (
    <Form {...form}>
      {showSuccess ? (
        <div className="w-full flex flex-col items-center justify-center py-10">
          <Lottie
            animationData={successAnimation}
            loop={true}
            className="w-40 h-60"
          />
          <Button
            onClick={() => {
              typeof window !== "undefined" && window.location.reload();
            }}
            className="h-14 lg:max-w-[224px] flex-1 w-full rounded-[20px] border border-dinero-border drop-shadow-lg bg-dinero-primary text-white text-xl font-normal hover:bg-dinero-primary-hover hover:border-dinero-primary hover:drop-shadow-lg"
          >
            İş Tanımına Geri Dön
          </Button>
        </div>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 2xl:gap-10 items-end"
        >
          <div className="flex flex-col gap-5 2xl:gap-10 w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-2.5 md:gap-y-5 2xl:gap-y-10 gap-x-[1.875rem]">
              <InputElement
                form={form}
                name="firstName"
                label="Adınız"
                placeholder="Adınızı girin"
                required
                icon={<Icons.user />}
              />
              <InputElement
                form={form}
                name="lastName"
                label="Soyadınız"
                placeholder="Soyadınızı girin"
                required
                icon={<Icons.user />}
              />
              <InputElement
                form={form}
                name="email"
                label="E-Posta Adresiniz"
                placeholder="E-posta adresinizi girin"
                required
                icon={<Icons.mail />}
              />
              <PhoneNumber
                form={form}
                name="phone"
                label="Telefon Numaranız"
                placeholder="(5xx) 123 45 67"
              />
              {address && (
                <>
                  <CommandMenu
                    form={form}
                    name="province"
                    label="İl"
                    placeholder="İl Seçiniz"
                    icon={<Icons.location />}
                    data={cities}
                    onSelect={(cityName) => handleCityChange(cityName)}
                  />
                  <CommandMenu
                    form={form}
                    name="district"
                    label="İlçe"
                    placeholder={selectedCity ? "İlçe Seçiniz" : "Önce il seçiniz"}
                    icon={<Icons.location />}
                    data={districts}
                    disabled={!selectedCity}
                  />
                </>
              )}
            </div>
            {address && (
              <div className="w-full">
                <InputElement
                  form={form}
                  name="address"
                  label="Açık Adres"
                  placeholder="Açık Adres Giriniz"
                  required
                  icon={<Icons.location />}
                  className="w-full"
                />
              </div>
            )}
            <div className="w-full">
              <InputElement
                form={form}
                name="linkedin"
                label="Linkedin URL"
                placeholder="https://www.linkedin.com/in/"
                required
                icon={<Icons.linkedin />}
                className="w-full"
              />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-2.5 md:gap-y-5 gap-x-[1.875rem]">
              <UploadFile form={form} name="file" label="CV Yükleyin" />
              <SalaryExpectation
                form={form}
                name="salaryExpectation"
                label="Maaş Beklentisi"
                placeholder="00,000 ₺"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full">
            <Checkbox
              id="terms"
              className="data-[state=checked]:bg-dinero-primary data-[state=checked]:border-none data-[state=checked]:shadow-none w-5 h-5 flex items-center justify-center"
            >
              <Icons.logo />
            </Checkbox>
            <Label
              htmlFor="terms"
              className="text-xs font-normal text-dinero-text-secondary tracking-[-1%] leading-[18px]"
            >
              Tarafıma hizmet sunulması amacıyla paylaştığım kişisel verilerimin
              işlenmesine ilişkin KVKK Metni&apos;ni okudum. Kişisel verilerimin
              belirtilen kapsamda işlenmesine onay veriyorum.
            </Label>
          </div>
          <div className="flex flex-col md:flex-row w-full justify-end gap-3 md:gap-5">
            <Button className="h-14 lg:max-w-[228px] flex-1 w-full rounded-[20px] border border-dinero-border bg-dinero-white text-dinero-text-secondary text-xl font-normal hover:bg-dinero-white hover:border-dinero-border hover:drop-shadow-lg">
              İş Tanımına Geri Dön
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="h-14 lg:max-w-[224px] flex-1 w-full rounded-[20px] border border-dinero-border drop-shadow-lg bg-dinero-primary text-white text-xl font-normal hover:bg-dinero-primary-hover hover:border-dinero-primary hover:drop-shadow-lg"
            >
              {isPending ? (
                <Lottie
                  animationData={loadingAnimation}
                  loop={true}
                  className="w-14 h-14"
                />
              ) : (
                "Başvuruyu Tamamla"
              )}
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default ApplyForm;
