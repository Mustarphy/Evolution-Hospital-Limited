import { createBrowserRouter } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import PageLoader from '../components/ui/PageLoader'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import RouteError from '../pages/RouteError'

const page = (load) => async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    HydrateFallback: PageLoader,
    children: [
      {
        ErrorBoundary: RouteError,
        children: [
          { index: true, Component: Home },
          { path: 'about', lazy: page(() => import('../pages/About')) },
          { path: 'services', lazy: page(() => import('../pages/Services')) },
          { path: 'services/:serviceSlug', lazy: page(() => import('../pages/ServiceDetails')) },
          { path: 'departments', lazy: page(() => import('../pages/Departments')) },
          { path: 'departments/:departmentSlug', lazy: page(() => import('../pages/DepartmentDetails')) },
          { path: 'doctors', lazy: page(() => import('../pages/Doctors')) },
          { path: 'doctors/:doctorSlug', lazy: page(() => import('../pages/DoctorProfile')) },
          { path: 'gallery', lazy: page(() => import('../pages/Gallery')) },
          { path: 'hmo', lazy: page(() => import('../pages/HMO')) },
          { path: 'contact', lazy: page(() => import('../pages/Contact')) },
          { path: 'appointment', lazy: page(() => import('../pages/Appointment')) },
          { path: '*', Component: NotFound },
        ],
      },
    ],
  },
])
