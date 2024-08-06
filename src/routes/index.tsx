import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "../layouts/LayoutAdmin/LayoutAdmin";
import LayoutWebsite from "../layouts/LayoutWebsite/LayoutWebsite";
import HomePage from "../website/HomePage";
import MoviesDashboard from "../dashboard/movies/moviesDashboard"
import NotFound from "../website/NotFound";
import UpdateMovies from "../dashboard/movies/UpdateMovies";
import CreateMovie from "../dashboard/movies/CreateMovie";
import SignIn from "../auth/SignIn";
import Login from "../auth/Login";
import DetailMovie from "../views/DetailMovie";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />} >
          <Route index element={<HomePage />} />
          <Route path="/phim/:slug/:id" element={<DetailMovie />} />
        </Route>
        <Route path="admin" element={
        
            <LayoutAdmin />
          }>
          <Route index element={<MoviesDashboard />} />
          <Route path="update-movies/:id" element={<UpdateMovies />} />
          <Route path="create-movie" element={<CreateMovie />} />

        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="auth-login" element={<Login />}/>
        <Route path="auth-sigin" element={<SignIn />}/>
      </Routes>
    </>
  );
};

export default Router;
