import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import CompareDrawer from "./components/bike/CompareDrawer";
import FloatingChatbot from "./components/chat/FloatingChatbot";

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-surface-page text-surface-text selection:bg-surface-primary selection:text-white transition-colors duration-200">
            {/* Global Navbar Header */}
            <Navbar />

            {/* Main Application Routes Content */}
            <main className="flex-1">
              <AppRoutes />
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Floating Widgets & Interactive Drawers */}
            <CompareDrawer />
            <FloatingChatbot />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}