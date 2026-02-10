import { Zap, Flame, Building2, Droplets, Trash2, FileText, Search, MessageSquarePlus, ClipboardList } from "lucide-react";
import DepartmentCard from "@/components/DepartmentCard";
import KioskHeader from "@/components/KioskHeader";
import heroBanner from "@/assets/hero-banner.jpg";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const departments = [
    { icon: Zap, title: t("departments.electricity"), description: t("departmentDesc.electricity"), path: "/department/electricity", color: "saffron" as const },
    { icon: Flame, title: t("departments.gas"), description: t("departmentDesc.gas"), path: "/department/gas", color: "navy" as const },
    { icon: Building2, title: t("departments.municipal"), description: t("departmentDesc.municipal"), path: "/department/municipal", color: "teal" as const },
    { icon: Droplets, title: t("departments.water"), description: t("departmentDesc.water"), path: "/department/water", color: "green" as const },
    { icon: Trash2, title: t("departments.waste"), description: t("departmentDesc.waste"), path: "/department/waste", color: "saffron" as const },
    { icon: FileText, title: t("departments.property"), description: t("departmentDesc.property"), path: "/department/property", color: "navy" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <KioskHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Smart city services" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        </div>
        <div className="container relative py-16 md:py-24">
          <div className="max-w-2xl animate-slide-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-medium text-secondary">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              {t("appSubtitle")}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed max-w-lg">
              {t("heroSubtitle")}
            </p>

            {/* Taglines */}
            <div className="mt-6 space-y-2">
              <p className="text-base font-semibold text-secondary italic">
                {t("tagline1")}
              </p>
              <p className="text-sm text-primary-foreground/70 italic">
                {t("tagline2")}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/track")}
                className="kiosk-touch-target inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground transition-all hover:brightness-110 kiosk-glow"
              >
                <Search className="h-5 w-5" />
                {t("trackRequest")}
              </button>
              <button
                onClick={() => navigate("/complaint")}
                className="kiosk-touch-target inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10"
              >
                <MessageSquarePlus className="h-5 w-5" />
                {t("registerComplaint")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground">{t("selectDepartment")}</h2>
          <p className="mt-2 text-muted-foreground">{t("selectDepartmentDesc")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <DepartmentCard key={dept.title} {...dept} />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="border-t border-border bg-card py-12">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-3">
            <button
              onClick={() => navigate("/complaint")}
              className="kiosk-touch-target flex items-center gap-4 rounded-lg bg-muted p-5 transition-colors hover:bg-muted/70"
            >
              <MessageSquarePlus className="h-8 w-8 text-secondary" />
              <div className="text-left">
                <div className="font-semibold text-foreground">{t("registerComplaint")}</div>
                <div className="text-sm text-muted-foreground">{t("submitGrievance")}</div>
              </div>
            </button>
            <button
              onClick={() => navigate("/track")}
              className="kiosk-touch-target flex items-center gap-4 rounded-lg bg-muted p-5 transition-colors hover:bg-muted/70"
            >
              <Search className="h-8 w-8 text-kiosk-teal" />
              <div className="text-left">
                <div className="font-semibold text-foreground">{t("trackRequest")}</div>
                <div className="text-sm text-muted-foreground">{t("trackStatusDesc")}</div>
              </div>
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="kiosk-touch-target flex items-center gap-4 rounded-lg bg-muted p-5 transition-colors hover:bg-muted/70"
            >
              <ClipboardList className="h-8 w-8 text-kiosk-green" />
              <div className="text-left">
                <div className="font-semibold text-foreground">{t("myDashboard")}</div>
                <div className="text-sm text-muted-foreground">{t("dashboardDesc")}</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>{t("footerText")}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
