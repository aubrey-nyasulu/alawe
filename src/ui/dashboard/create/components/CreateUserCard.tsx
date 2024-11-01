import { Card } from "@/tremorComponents/Card";
import { ReactNode } from "react";

export function CreateUserCard({ children, title, subTitle }: { children: ReactNode, title: string, subTitle: string }) {
    return (
        <Card className="p-2">
            <div className="flex-1 p-1 md:p-8 flex gap-2 items-center justify-between">
                <h2 className="text-xl font-bold text-gray-600">{title}</h2>
                <p className="text-gray-500 text-sm">{subTitle}</p>
            </div>
            {children}
        </Card>
    );
}
