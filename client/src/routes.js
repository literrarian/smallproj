import Admin from "./pages/Admin";
import {ADMIN_ROUTE} from "./utils/consts"
import UserAccPage from "./pages/UserAccPage";
import {USER_ROUTE} from "./utils/consts"

import GameCataloguePage from "./pages/GameCataloguePage";
import {GAME_CAT_ROUTE} from "./utils/consts"
import GenresPage from "./pages/GenresPage";
import {GENRE_ROUTE} from "./utils/consts"
import MeetingCataloguePage from "./pages/MeetingCataloguePage";
import {MEETING_CAT_ROUTE} from "./utils/consts"
import Auth from "./pages/Auth";
import {LOGIN_ROUTE} from "./utils/consts"
import {REGISTRATION_ROUTE} from "./utils/consts"
import GamePage from "./pages/GamePage";
import {GAME_ROUTE} from "./utils/consts"
import MeetingPage from "./pages/MeetingPage";
import {MEETING_ROUTE} from "./utils/consts"
export const authRoutes = [
    {
       path: ADMIN_ROUTE,
       component: Admin 
    },
    {
        path: USER_ROUTE,
        component: UserAccPage
    },
]
 export const publicRoutes = [
     {
         path: GAME_CAT_ROUTE,
         component: GameCataloguePage
     },
     {
         path: GENRE_ROUTE,
         component: GenresPage
     },  
     {
         path: MEETING_CAT_ROUTE,
         component: MeetingCataloguePage
     },
     {
         path: LOGIN_ROUTE,
         component: Auth
     },
     {
         path: REGISTRATION_ROUTE,
         component: Auth
     },
     {
         path: GAME_ROUTE + '/:id',
         component: GamePage
     },
     {
         path: MEETING_ROUTE + '/:id',
         component: MeetingPage
     },
     
 ]