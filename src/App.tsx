import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MobileNavOverlay } from "@/components/layout/MobileNavOverlay";
import MaintenancePage from "@/pages/MaintenancePage";
import HomePage from "@/pages/HomePage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import PhotographyPage from "@/pages/PhotographyPage";
import TripGalleryPage from "@/pages/TripGalleryPage";
import AboutPage from "@/pages/AboutPage";
import ContributionsPage from "@/pages/ContributionsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import DebugPage from "@/pages/DebugPage";
import PageView from "@/pages/PageView";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (siteConfig.maintenance.enabled) {
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
          className="flex-1"
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contributions" element={<ContributionsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/post/:slug" element={<BlogPostPage />} />
            <Route path="/travel" element={<PageView pageId={siteConfig.notionPages.travel} title="Travel" />} />
            <Route path="/photography" element={<PhotographyPage />} />
            <Route path="/photography/:slug" element={<TripGalleryPage />} />
            {siteConfig.enableDebug && <Route path="/debug" element={<DebugPage />} />}
            <Route path="/page/:pageId" element={<PageView />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
