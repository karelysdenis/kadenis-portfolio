import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeCustomizer from './components/ThemeCustomizer';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-primary-600 mb-4"></div>
      <p className="text-slate-400">Loading...</p>
    </div>
  </div>
);

function App() {
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar onThemeClick={() => setIsThemeCustomizerOpen(true)} />
        <main className="flex-grow">
          <ErrorBoundary
            message="Unable to load this page. Please try refreshing."
          >
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <ThemeCustomizer
          isOpen={isThemeCustomizerOpen}
          setIsOpen={setIsThemeCustomizerOpen}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
