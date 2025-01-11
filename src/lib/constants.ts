import sausageImg from '@/../public/store/sausage.jpg'
import Meance from '@/../public/store/meanced meat.jpg'
import Liver from '@/../public/store/liver.jpg'
import Wings from '@/../public/store/wings.jpg'
import beefliver from '@/../public/store/beef liver.jpg'
import beefribs from '@/../public/store/beef ribs.jpg'
import beefsteak from '@/../public/store/beef steak.jpg'
import ChickenDrumsticks from '@/../public/store/Chicken Drumsticks.jpg'
import wholechicken from '@/../public/store/whole chicken.jpg'

export const CEOAnalyticsLinks = [
    { name: 'Analytics', href: '/dashboard' },
];

export const CEOWorksSpaceLinks = [
    { name: 'Review Center', href: '/dashboard/reviewcenter' },
    { name: 'Notifications', href: '/dashboard/notifications' },
];

export const adminAnalyticsLinks = [
    { name: 'Analytics', href: '/dashboard' },
    // {
    //     name: 'Invoices',
    //     href: '/dashboard/invoices',
    //     
    // },
    // { name: 'Inventory', href: '/dashboard/inventory },
];

export const adminworksSpaceLinks = [
    { name: 'Create', href: '/dashboard/create', },
    {
        name: 'Reports',
        href: '/dashboard/reports',

    },
    { name: 'Notifications', href: '/dashboard/notifications' },
];

export const BranchManagerAnalyticsLinks = [
    { name: 'Analytics', href: '/dashboard' },
    {
        name: 'Inventory',
        href: '/dashboard/inventory',
    },
];

export const BranchManagerWorksSpaceLinks = [
    {
        name: 'Reports',
        href: '/dashboard/reports',

    },
    { name: 'Notifications', href: '/dashboard/notifications' },
];

export const ProcurementManagerAnalyticsLinks = [
    { name: 'Analytics', href: '/dashboard' },
    // {
    //     name: 'Invoices',
    //     href: '/dashboard/invoices',

    // },
    // { name: 'Inventory', href: '/dashboard/inventory' }
];

export const ProcurementManagerWorksSpaceLinks = [
    {
        name: 'Purchase Transactions',
        href: '/dashboard/purchasetransactions',
    },
    {
        name: 'Reports',
        href: '/dashboard/reports',

    },
    { name: 'Notifications', href: '/dashboard/notifications' },
];

export const SupplyChainManagerAnalyticsLinks = [
    { name: 'Analytics', href: '/dashboard' },
    { name: 'Inventory', href: '/dashboard/inventory' },
];

export const SupplyChainManagerWorksSpaceLinks = [
    { name: 'Invoices', href: '/dashboard/invoices' },
    {
        name: 'Reports',
        href: '/dashboard/reports',

    },
    { name: 'Notifications', href: '/dashboard/notifications' },
];

export const ProductsImages = {
    'sausage': sausageImg,
    'Beef Sausages': sausageImg,
    'Minced Beef': Meance,
    'Chicken Liver': Liver,
    'Chicken Wings': Wings,
    'Whole Chicken': wholechicken,
    'Liver Beef': beefliver,
    'Beef Ribs': beefribs,
    'Beef Steak': beefsteak,
    'Chicken Drumsticks': ChickenDrumsticks,
}