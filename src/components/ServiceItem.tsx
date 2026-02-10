import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

const ServiceItem = ({ icon: Icon, title, description, onClick }: ServiceItemProps) => {
  return (
    <button
      onClick={onClick}
      className="group kiosk-touch-target flex items-start gap-4 rounded-lg bg-card p-6 text-left kiosk-card-shadow transition-all duration-200 hover:kiosk-card-shadow-hover hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring w-full"
    >
      <div className="rounded-xl bg-secondary/10 p-3 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
};

export default ServiceItem;
