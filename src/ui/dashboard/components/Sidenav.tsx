import SideNavProfileDropdown from './SideNavProfileDropdown';

import { Card } from '@/tremorComponents/Card';
import SideNavLinks from './SideNavLinks';
import SideNavLogoArea from './SideNavLogoArea';
import useServerSession from '@/customHooks/useServerSession';
import { User } from '@/types';
import { MobileMenuDrawer } from './MobileMenuDrawer';
import MobileMenuButton from './MobileMenuButton';
import NotificationsComponent from './NotificationsComponent';

export default async function SideNav() {
  const { session } = await useServerSession()

  const { _id, username, role } = session?.user as User

  return (
    <Card className="w-full h-full flex items-center justify-between flex-row md:flex-col sticky top-0 left-0 p-0 py-2 md:p-0 rounded-none dark:border-r-gray-900 z-50">

      <div className='w-fit md:w-full flex items-center gap-2'>
        <SideNavLogoArea />
        <div className='md:hidden  flex gap-2 items-center'>
          <MobileMenuButton />
          <MobileMenuDrawer {...{ role, _id, }} />
        </div>
      </div>

      <div className="w-full h-full gap-2 grow flex-row  md:flex-col  py-8 hidden md:flex">
        <SideNavLinks {...{ role, _id, }} />
      </div>

      <div className='w-full md:flex hidden  border-t border-t-[#e0e0e0] dark:border-t-gray-900'>
        <SideNavProfileDropdown {...{ username, role }} />
      </div>

      <div className='md:hidden mr-4 flex gap-2 items-center '>
        <NotificationsComponent />
        <SideNavProfileDropdown />
      </div>
    </Card >
  );
}
