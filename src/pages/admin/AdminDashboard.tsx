import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
    const { t } = useTranslation();

    const stats = [
        { label: t("admin.totalComplaints"), value: 1248, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: t("admin.pending"), value: 342, icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
        { label: t("admin.resolved"), value: 856, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
        { label: t("admin.critical"), value: 50, icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
    ];

    const recentActivity = [
        { id: "SVD-2026-00142", user: "Rajesh Kumar", dept: t("departments.electricity"), action: t("admin.statusUpdated"), time: `10 ${t("admin.minsAgo")}` },
        { id: "SVD-2026-00141", user: "Priya Singh", dept: t("departments.water"), action: t("admin.newComplaint"), time: `25 ${t("admin.minsAgo")}` },
        { id: "SVD-2026-00138", user: "Amit Shah", dept: t("departments.municipal"), action: t("admin.complaintResolved"), time: `1 ${t("admin.hourAgo")}` },
        { id: "SVD-2026-00135", user: "Sneha Gupta", dept: t("departments.gas"), action: t("admin.assignedToOfficer"), time: `2 ${t("admin.hoursAgo")}` },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t("admin.dashboardTitle")}</h1>
                <p className="text-muted-foreground">{t("admin.dashboardWelcome")}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border bg-card shadow-sm">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">{t("admin.recentActivity")}</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-6">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div>
                                    <p className="font-medium text-foreground">{activity.action}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {activity.user} • {activity.dept} • {activity.id}
                                    </p>
                                </div>
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
