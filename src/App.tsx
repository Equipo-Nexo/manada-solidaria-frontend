import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppContent, AppShell } from "./App.styles";
import {
  DesktopAuthenticatedView,
  MobileAuthenticatedView,
  InstallButton,
} from "@components/index.ts";
import Login from "./auth/pages/login/Login";
import PublishFundraising from "./fundraisings/pages/create_fundraising_campaign/PublishFundraising";
import Register from "./auth/pages/register/Register";
import useAuth from "@hooks/auth/useAuth";
import PrivateRoutes from "./common/components/routes/PrivateRoutes";
import MyPosts from "./users/pages/my_posts/MyPosts";
import Fundraising from "./fundraisings/pages/all_fundraisings/Fundraising";
import Menu from "./common/components/menu/Menu";
import Home from "./home/Home";
import Campaigns from "@campaigns/pages/all_campaigns/Campaigns";
import AllPublicationsMap from "./all_publications_map/pages/AllPublicationsMap";
import NewAnimalPostForm from "./animals/pages/create_animal_post/CreateAnimalPost";
import EditFundraising from "./fundraisings/pages/edit_fundraising_campaign/EditFundraisingCampaign";
import EditCampaign from "./campaigns/pages/edit_campaign/EditCampaign";
import PublishCampaign from "./campaigns/pages/create_campaign/PublishCampaign";
import AllAnimalsPage from "./animals/pages/all_animal_posts/AllAnimalsPosts";
import EditAnimalPostForm from "./animals/pages/edit_animal_post/EditAnimalPost";
import UpdateSuccess from "./common/pages/edit_success/UpdateSuccess";
import ScrollToTop from "./common/components/routes/ScrollToTop";
import Profile from "./users/pages/profile/Profile";
import FundraisingCampaignDetail from "./fundraisings/pages/fundraising_campaign_detail/FundraisingCampaignDetail";
import Community from "./community/pages/Community";
import AnimalPostDetail from "./animals/pages/detail_post/DetailAnimalPost";
import Services from "./services/pages/Services";
import SuccessStories from "./successStories/pages/SuccessStories";
import Security from "./users/pages/security/Security";

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isFullScreenPublish =
    location.pathname === "/publicar/animal" ||
    location.pathname === "/publicar/campania" ||
    location.pathname === "/publicar/colecta" ||
    location.pathname === "/editar/exito" ||
    location.pathname.startsWith("/editar/animal/") ||
    location.pathname.startsWith("/editar/colecta/") ||
    location.pathname.startsWith("/editar/campania/");
  const isMobileMenu = location.pathname === "/menu";
  const isPublicationDetail = location.pathname.startsWith("/animal/detalle/");

  const usesFullScreenLayout =
    location.pathname === "/login" ||
    location.pathname === "/registro" ||
    isFullScreenPublish ||
    isMobileMenu ||
    isPublicationDetail;
  const showAuthenticatedShell =
    isAuthenticated && (!usesFullScreenLayout || isMobileMenu);

  return (
    <>
      <ScrollToTop />
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
              <Route path="/editar/exito" element={<UpdateSuccess />} />
              <Route
                path="/editar/animal/:postId"
                element={<EditAnimalPostForm />}
              />
              <Route
                path="/editar/colecta/:fundraisingId"
                element={<EditFundraising />}
              />
              <Route
                path="/editar/campania/:campaignId"
                element={<EditCampaign />}
              />
              <Route
                path="/publicar/colecta"
                element={<PublishFundraising />}
              />
              <Route path="/publicar/campania" element={<PublishCampaign />} />
              <Route path="/animales" element={<AllAnimalsPage />} />
              <Route path="/colectas" element={<Fundraising />} />
              <Route
                path="/colectas/:fundraisingId"
                element={<FundraisingCampaignDetail />}
              />
              <Route path="/menu" element={<Menu />} />
              <Route path="/animal/detalle/:postId" element={<AnimalPostDetail />} />
              <Route path="/comunidad" element={<Community />} />
              <Route path="/mi-perfil" element={<Profile />} />
              <Route path="/seguridad" element={<Security />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/casos-felices" element={<SuccessStories />} />
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
