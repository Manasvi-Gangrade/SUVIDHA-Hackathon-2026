import { Clock, Ticket } from "lucide-react";

interface QueueTokenProps {
    token: string;
    waitTime: string;
}

const QueueToken = ({ token, waitTime }: QueueTokenProps) => {
    return (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Your Token</h3>
                    <div className="mt-2 text-4xl font-bold text-primary tracking-wider">{token}</div>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                    <Ticket className="h-6 w-6 text-primary" />
                </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <Clock className="h-4 w-4" />
                <span>Est. Wait Time: <span className="font-semibold text-foreground">{waitTime}</span></span>
            </div>

            <div className="mt-4 text-xs text-center text-muted-foreground">
                Please wait for your number to be called
            </div>
        </div>
    );
};

export default QueueToken;
