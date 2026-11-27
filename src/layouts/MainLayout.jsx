import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useNavigation } from 'react-router'
import BackToTop from '../components/BackToTop'
import FloatingSupport from '../components/FloatingSupport'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { dismissSplash } from '../lib/splash'

function NavigationProgress() {
  const navigation = useNavigation()
  const isLoading = navigation.state !== 'idle'

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-x-0 top-0 z-70 h-0.5 origin-left bg-brand-500 transition-[scale,opacity] duration-500 ease-out-soft ${
        isLoading ? 'scale-x-75 opacity-100' : 'scale-x-100 opacity-0'
      }`}
    />
  )
}

export default function MainLayout() {
  useEffect(() => {
    dismissSplash()
  }, [])

  return (
    <>
      <NavigationProgress />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <div className="pointer-events-none fixed right-4 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-30 flex items-end gap-3 md:right-6 *:pointer-events-auto">
        <BackToTop />
        <FloatingSupport />
      </div>
      <ScrollRestoration />
    </>
  )
}
