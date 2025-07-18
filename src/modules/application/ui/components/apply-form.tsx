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
import { useMutation, useQuery } from "@tanstack/react-query";
import { provincesOrDistricts, submit } from "@/api-store/global";
import type { CustomError } from "@/api-store";
import type { ApplicationForm } from "@/lib/types";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  linkedin: z.string().min(1),
  salaryExpectation: z.string().min(1),
  file: z.instanceof(File),
  province: z.string().min(1),
  district: z.string().min(1),
  address: z.string().min(1),
});

const ApplyForm = () => {
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

  const submitMutation = useMutation({
    mutationFn: async (data: ApplicationForm) => await submit(data),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error: CustomError) => {
      toast.error(error.info?.data?.code || error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submitMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      telephone: data.phone,
      linkedinUrl: data.linkedin,
      cv: "",
      salaryExpectation: Number(data.salaryExpectation),
      province: data.province,
      district: data.district,
      address: data.address,
      eMail: data.email,
    });
  };

  const { data: provinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: async () => await provincesOrDistricts(),
    select: (res) => res.data,
  });

  console.log(provinces);

  return (
    <Form {...form}>
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
            <CommandMenu
              form={form}
              name="province"
              label="İl"
              placeholder="İl Giriniz"
              icon={<Icons.location />}
              data={[]}
            />
            <CommandMenu
              form={form}
              name="district"
              label="İlçe"
              placeholder="İlçe Giriniz"
              icon={<Icons.location />}
              data={[]}
            />
          </div>
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
            className="data-[state=checked]:bg-[#3F2F70] data-[state=checked]:border-none data-[state=checked]:shadow-none w-5 h-5 flex items-center justify-center"
          >
            <Icons.logo />
          </Checkbox>
          <Label
            htmlFor="terms"
            className="text-xs font-normal text-[#5A5A59] tracking-[-1%] leading-[18px]"
          >
            Tarafıma hizmet sunulması amacıyla paylaştığım kişisel verilerimin
            işlenmesine ilişkin KVKK Metni&apos;ni okudum. Kişisel verilerimin
            belirtilen kapsamda işlenmesine onay veriyorum.
          </Label>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-end gap-3 md:gap-5">
          <Button className="h-14 lg:max-w-[228px] flex-1 w-full rounded-[20px] border border-[#E4E1EC] bg-white text-[#5A5A59] text-xl font-normal hover:bg-white hover:border-[#E4E1EC] hover:drop-shadow-lg hover:drop-shadow-[#3F2F7040]/20">
            İş Tanımına Geri Dön
          </Button>
          <Button className="h-14 lg:max-w-[224px] flex-1 w-full rounded-[20px] border border-[#E4E1EC] drop-shadow-lg drop-shadow-[#3F2F7040]/20 bg-[#3F2F70] text-white text-xl font-normal hover:bg-[#3F2F70] hover:border-[#3F2F70] hover:drop-shadow-lg hover:drop-shadow-[#3F2F7040]/20">
            Başvuruyu Tamamla
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ApplyForm;
