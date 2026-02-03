import { createBrowserRouter } from 'react-router';
import Root from '@/app/Root';
import Landing from '@/app/pages/Landing';
import EnhancedAuth from '@/app/pages/EnhancedAuth';
import Onboarding from '@/app/pages/Onboarding';
import HostDashboard from '@/app/pages/HostDashboard';
import CreateProperty from '@/app/pages/CreateProperty';
import PropertyDetail from '@/app/pages/PropertyDetail';
import GuestView from '@/app/pages/GuestView';
import GuestRegistration from '@/app/pages/GuestRegistration';
import GuestDashboard from '@/app/pages/GuestDashboard';
import NotFound from '@/app/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Landing,
      },
      {
        path: 'login',
        Component: EnhancedAuth,
      },
      {
        path: 'onboarding',
        Component: Onboarding,
      },
      {
        path: 'dashboard',
        Component: HostDashboard,
      },
      {
        path: 'properties/new',
        Component: CreateProperty,
      },
      {
        path: 'properties/:id',
        Component: PropertyDetail,
      },
      {
        path: 'g/:token',
        Component: GuestView,
      },
      {
        path: 'g/:token/register',
        Component: GuestRegistration,
      },
      {
        path: 'g/:token/dashboard',
        Component: GuestDashboard,
      },
      {
        path: 'guest/:id',
        Component: GuestRegistration,
      },
      {
        path: 'guest/:id/dashboard',
        Component: GuestDashboard,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);