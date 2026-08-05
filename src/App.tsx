import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppContent, AppShell } from "./App.styles";
import { DesktopAuthenticatedView, MobileAuthenticatedView, InstallButton } from "@components/index.ts"
import Login from "./login/Login";
import PublishFundraising from "./fundraising/publishg_fundraising_campaign/PublishFundraising";
import Register from "./register/Register";
import useAuth from "@hooks/auth/useAuth";
import PrivateRoutes from "./routes/PrivateRoutes";
import MyPosts from "./my_posts/MyPosts";
import Fundraising from "./fundraising/Fundraising";
import Menu from "./menu/Menu";
import Home from "./home/Home";
import Campaigns from "./campaigns/Campaigns";
import AllPublicationsMap from "./all_publications_map/AllPublicationsMap";
import NewAnimalPostForm from "./animals/pages/animalPosts/newAnimalPost/Form";
import EditFundraising from "./campaigns/editFundraisingCampaign/EditFundraisingCampaign";
import EditAnimalPostSuccess from "./animals/pages/animalPosts/editAnimalPost/EditAnimalPostSuccess";
import EditCampaign from "./campaigns/EditCampaign/EditCampaign";
import EditCampaignSuccess from "./campaigns/EditCampaign/EditCampaignSuccess";
import PublishCampaign from "./campaigns/publish_campaign/PublishCampaign";
import AllAnimalsPage from "./animals/pages/allAnimalPosts/AllAnimalsPage";
import EditAnimalPostForm from "./animals/pages/animalPosts/editAnimalPost/editAnimalPost";

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isFullScreenPublish =
    location.pathname === "/publicar/animal" ||
    location.pathname === "/publicar/campania" ||
    location.pathname === "/publicar/colecta" ||
    location.pathname.startsWith("/editar/animal/") ||
    location.pathname.startsWith("/editar/campania/");
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
              <Route path="/editar/animal/:postId" element={<EditAnimalPostForm />} />
              <Route path="/editar/colecta/:fundraisingId" element={<EditFundraising />} />
              <Route
                path="/editar/animal/:postId/exito"
                element={<EditAnimalPostSuccess />}
              />
              <Route path="/editar/campania/:campaignId" element={<EditCampaign />} />
              <Route
                path="/editar/campania/:campaignId/exito"
                element={<EditCampaignSuccess />}
              />
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
