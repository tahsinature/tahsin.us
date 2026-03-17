import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, lazy, useEffect, createElement } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { usePhotographyStore } from "@/stores/usePhotographyStore";
import { TAB_CONFIGS, useActiveTabs } from "@/data/navigation";
import { runPrefetches } from "@/lib/prefetch";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MobileNavOverlay } from "@/components/layout/MobileNavOverlay";
import MaintenancePage from "@/pages/MaintenancePage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import PageSkeleton from "@/components/PageSkeleton";

const PageView = lazy(() => import("@/pages/PageView"));

function App() {
  const location = useLocation();
  const fetchTrips = usePhotographyStore((s) => s.fetchTrips);
  const appConfig = useAppStore((s) => s.config);
  const activeTabs = useActiveTabs();

  useEffect(() => {
    runPrefetches();
    fetchTrips();
  }, [fetchTrips]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const configStatus = useAppStore((s) => s.configStatus);

  if (configStatus !== "ready" && configStatus !== "error") {
    return null;
  }

  if (appConfig?.maintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground max-w-[100vw]">
      <Header />
      <MobileNavOverlay />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-1 flex flex-col"
        >
          <Suspense fallback={<PageSkeleton />}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              {TAB_CONFIGS.filter((c) => (activeTabs as string[]).includes(c.tab)).flatMap((c) =>
                c.routes.map((r) => <Route key={r.path} path={r.path} element={createElement(r.element, r.props)} />),
              )}
              <Route path="/page/:pageId" element={<PageView />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
