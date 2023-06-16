import CreateGenre from "./genres/CreateGenre";
import IndexGenres from "./genres/IndexGenres";
import EditGenre from "./genres/EditGenre";
import LandingPage from "./movies/LandingPage";
import CreateActor from "./actors/CreateActor";
import EditActor from "./actors/EditActor";
import IndexActors from "./actors/IndexActors";
import CreateMovieTheater from "./movietheaters/CreateMovieTheater";
import EditMovieTheater from "./movietheaters/EditMovieTheater";
import IndexMovieTheaters from "./movietheaters/IndexMovieTheaters";
import CreateMovie from "./movies/CreateMovie";
import EditMovie from "./movies/EditMovie";
import FilterMovies from "./movies/FilterMovies";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";
import MovieDetails from "./movies/MovieDetails";

const routes = [
    {path:'/', component: LandingPage, exact:true},


    {path:'/genres', component: IndexGenres},
    {path:'/genres/create', component: CreateGenre},
    {path:'/genres/edit/:id', component: EditGenre},

    {path:'/actors', component: IndexActors},
    {path:'/actors/create', component: CreateActor},
    {path:'/actors/edit/:id', component: EditActor},

    {path:'/movietheaters', component: IndexMovieTheaters},
    {path:'/movietheaters/create', component: CreateMovieTheater},
    {path:'/movietheaters/edit/:id', component: EditMovieTheater},

    
    {path:'/movies/create', component: CreateMovie},
    {path:'/movies/edit/:id', component: EditMovie},
    {path:'/movies/filter', component: FilterMovies},
    {path:'/movie/:id', component: MovieDetails},



    {path:'*', component: RedirectToLandingPage}
];

export default routes;