import { useState } from "react";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import AuthenticatedMenuOverlay from "./AuthenticatedMenuOverlay";
import { MobileViewChrome } from "./AuthenticatedView.styles";
import { useLocation } from "react-router-dom";

function MobileAuthenticatedView() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const routesWithoutNavigation = [
    "/publicar/campania",
    "/publicar/animal",
    "/publicar/colecta",
  ];

  const hideNavigation = routesWithoutNavigation.includes(location.pathname);
  return (
    <MobileViewChrome>
      {!hideNavigation && <Header />}

      {!hideNavigation && (
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuClick={() => setIsMenuOpen(true)}
          onNavigate={() => setIsMenuOpen(false)}
        />
      )}

      <AuthenticatedMenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </MobileViewChrome>
  );
}

export default MobileAuthenticatedView;
