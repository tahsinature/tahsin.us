import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, lazy, useEffect } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { usePhotographyStore } from "@/stores/usePhotographyStore";
import { runPrefetches } from "@/lib/prefetch";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MobileNavOverlay } from "@/components/layout/MobileNavOverlay";
import MaintenancePage from "@/pages/MaintenancePage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";

const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const PhotographyPage = lazy(() => import("@/pages/PhotographyPage"));
const TripGalleryPage = lazy(() => import("@/pages/TripGalleryPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContributionsPage = lazy(() => import("@/pages/ContributionsPage"));
const DebugPage = lazy(() => import("@/pages/DebugPage"));
const PageView = lazy(() => import("@/pages/PageView"));

function App() {
  const location = useLocation();
  const fetchTrips = usePhotographyStore((s) => s.fetchTrips);
  const appConfig = useAppStore((s) => s.config);

  useEffect(() => {
    runPrefetches();
    fetchTrips();
  }, [fetchTrips]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
          <Suspense fallback={<div className="flex-1" />}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contributions" element={<ContributionsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/post/:slug" element={<BlogPostPage />} />
              <Route path="/travel" element={<PageView fetchUrl="/api/pages/travel" title="Travel" />} />
              <Route path="/photography" element={<PhotographyPage />} />
              <Route path="/photography/:slug" element={<TripGalleryPage />} />
              {appConfig?.debugMode && <Route path="/debug" element={<DebugPage />} />}
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
