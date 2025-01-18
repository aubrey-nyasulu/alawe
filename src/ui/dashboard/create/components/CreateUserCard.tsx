import { Card } from "@/tremorComponents/Card";
import { ReactNode } from "react";

export function CreateUserCard({ children, title, subTitle }: { children: ReactNode, title: string, subTitle: string }) {
    return (
        <Card className="p-2">
            <div className="flex-1 p-4 md:p-6 flex gap-2 items-center justify-between">
                <h2 className="text-xl font-bold text-gray-600 capitalize ">{title}</h2>
                <p className="text-gray-500 text-sm">{subTitle}</p>
            </div>
            {children}
        </Card>
    );
}
