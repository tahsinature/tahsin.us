import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import PhotographyPage from "@/pages/PhotographyPage";
import TripGalleryPage from "@/pages/TripGalleryPage";
import AboutPage from "@/pages/AboutPage";
import ContributionsPage from "@/pages/ContributionsPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contributions" element={<ContributionsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/post/:slug" element={<BlogPostPage />} />
        <Route path="/photography" element={<PhotographyPage />} />
        <Route path="/photography/:slug" element={<TripGalleryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
