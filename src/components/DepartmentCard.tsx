import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DepartmentCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  color: "navy" | "saffron" | "teal" | "green";
}

const colorMap = {
  navy: "bg-primary text-primary-foreground",
  saffron: "bg-secondary text-secondary-foreground",
  teal: "bg-kiosk-teal text-secondary-foreground",
  green: "bg-kiosk-green text-secondary-foreground",
};

const DepartmentCard = ({ icon: Icon, title, description, path, color }: DepartmentCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="group kiosk-touch-target flex flex-col items-center gap-4 rounded-lg bg-card p-8 text-center kiosk-card-shadow transition-all duration-300 hover:kiosk-card-shadow-hover hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <div className={`rounded-2xl p-5 ${colorMap[color]} transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="h-10 w-10" strokeWidth={1.8} />
      </div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </button>
  );
};

export default DepartmentCard;
