import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppContent, AppShell } from "./App.styles";
import DesktopAuthenticatedView from "./components/authenticatedView/DesktopAuthenticatedView";
import MobileAuthenticatedView from "./components/authenticatedView/MobileAuthenticatedView";
import { InstallButton } from "./components/install_button/installButton";
import Campaigns from "./pages/campaigns/Campaigns";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import PublishCampaign from "./pages/publish/PublishCampaign";
import PublishFundraising from "./pages/publish/PublishFundraising";
import Register from "./pages/register/Register";
import useAuth from "./hooks/auth/useAuth";
import PrivateRoutes from "./routes/PrivateRoutes";
import MyPosts from "./pages/my_posts/MyPosts";
import AllAnimalsPage from "./pages/allAnimalPosts/AllAnimalsPage";
import NewAnimalPostForm from "./pages/newAnimalPost/Form";
import Fundraising from "./pages/fundraising/Fundraising";
import Menu from "./pages/menu/Menu";
import AllPublicationsMap from "./pages/all_publications_map/AllPublicationsMap";

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isFullScreenPublish =
    location.pathname === "/publicar/animal" ||
    location.pathname === "/publicar/campania" ||
    location.pathname === "/publicar/colecta";
  const isMobileMenu = location.pathname === "/menu";

  const usesFullScreenLayout =
    location.pathname === "/login" ||
    location.pathname === "/registro" ||
    isFullScreenPublish ||
    isMobileMenu;
  const showAuthenticatedShell =
    isAuthenticated && (!usesFullScreenLayout || isMobileMenu);

  return (
    <>
      <AppShell>
        {showAuthenticatedShell && (
          <>
            <MobileAuthenticatedView />
            <DesktopAuthenticatedView />
          </>
        )}
        <AppContent $isFullScreen={usesFullScreenLayout}>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/home" replace /> : <Login />
              }
            />
            <Route
              path="/registro"
              element={
                isAuthenticated ? <Navigate to="/home" replace /> : <Register />
              }
            />
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/campanias" element={<Campaigns />} />
              <Route path="/mapa" element={<AllPublicationsMap />} />
              <Route path="/mis-publicaciones" element={<MyPosts />} />
              <Route path="/publicar/animal" element={<NewAnimalPostForm />} />
              <Route
                path="/publicar/colecta"
                element={<PublishFundraising />}
              />
              <Route path="/publicar/campania" element={<PublishCampaign />} />
              <Route path="/animales" element={<AllAnimalsPage />} />
              <Route path="/colectas" element={<Fundraising />} />
              <Route path="/menu" element={<Menu />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AppContent>
      </AppShell>
      <InstallButton />
    </>
  );
}

export default App;
