import { RouteInfo } from './sidebar.metadata';
declare var require: any;
//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    {
        path: '/home', title: 'Dashboard', icon: 'fas fa-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], developerQa: true, seniorAdministrator: true, administrator: true, auditor: false, integrator: true
    },
    {
        path: '/sites', title: 'Sites', icon: 'fas fa-globe', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], developerQa: true, seniorAdministrator: true, administrator: true, auditor: false, integrator: true
    },
    {
        path: '/blocks', title: 'Blocks', icon: 'fas fa-cubes', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], developerQa: true, seniorAdministrator: true, administrator: true, auditor: false, integrator: true
    },
    {
        path: '/templates', title: 'Templates', icon: 'fas fa-shapes', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], developerQa: true, seniorAdministrator: true, administrator: true, auditor: false, integrator: true
    },
    {
        path: '/users', title: 'Users', icon: 'fas fa-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], developerQa: true, seniorAdministrator: true, administrator: true, auditor: false, integrator: true
    }
    
    
];
