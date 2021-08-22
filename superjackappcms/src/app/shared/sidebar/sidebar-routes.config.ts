import { RouteInfo } from './sidebar.metadata';
declare var require: any;
//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    {
        path: '/home', title: 'Dashboard', icon: 'home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], developerQa: true, seniorAdministrator: true, administrator: true, auditor: false, integrator: true
    },
    {
        path: '/sites', title: 'Sites', icon: 'globe', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], developerQa: true, seniorAdministrator: true, administrator: true, auditor: false, integrator: true
    },
    {
        path: '/blocks', title: 'Blocks', icon: 'cubes', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], developerQa: true, seniorAdministrator: true, administrator: true, auditor: false, integrator: true
    },
    {
        path: '/templates', title: 'Templates', icon: 'shapes', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], developerQa: true, seniorAdministrator: true, administrator: true, auditor: false, integrator: true
    },
    {
        path: '/users', title: 'Users', icon: 'users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], developerQa: true, seniorAdministrator: true, administrator: true, auditor: false, integrator: true
    }
    
    
];
