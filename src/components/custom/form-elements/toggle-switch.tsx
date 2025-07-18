import { Switch } from "@/components/ui/switch";

const ToggleSwitch = () => {
  return (
    <Switch
      id="address-visible"
      className="data-[state=checked]:bg-[linear-gradient(90deg,_#26263A_0%,_#543F95_50%,_#3F2F70_100%)]"
    />
  );
};

export default ToggleSwitch;
