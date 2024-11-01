import { getServerSession, Session } from "next-auth"
import SideNav from '@/ui/dashboard/components/Sidenav';
import SessionProvivider from '@/context/SessionProvider'
import PageStateProvider from "@/context/PageStateProvider";
import { authOptions } from "@/lib/auth";
import { EditProfileDrawer } from "@/ui/dashboard/components/EditProfileDrawer";
import { EditInvoiceDrawer } from "@/ui/dashboard/components/EditInvoiceDrawer";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions) as Session


    const { user: { _id, email, role, username } } = session

    return (
        <SessionProvivider session={
            {
                expires: session.expires,
                user: { _id, email, role, username }
            }
        }>
            <PageStateProvider session={
                // null
                {
                    expires: session.expires,
                    user: { _id, email, role, username }
                    // user: {_id, email, role, username}
                }
            }>
                <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                    <div className="w-full flex-none md:w-64">
                        <SideNav />
                    </div>
                    <div className="flex-grow md:overflow-y-auto relative md: overflow-x-hidden">
                        {children}
                    </div>
                </div>

                <EditProfileDrawer />
                <EditInvoiceDrawer />
            </PageStateProvider>
        </SessionProvivider >
    );
}