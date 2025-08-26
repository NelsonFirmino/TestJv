import { ReactNode } from "react";

export interface DashboardCardProps {
    title: string;
    children: ReactNode;
    button?: JSX.Element;
    request?: {
        isLoading: boolean;
    }
}