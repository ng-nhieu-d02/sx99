import Home from '~/pages/Home';
import Game from '~/pages/Game';
import Register from '~/pages/Register';
import Profile from '~/pages/Profile';
import { Phao } from '~/pages/Phao';
import { LayoutPhao } from '~/layouts';
// not required login
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/game/:link',
        component: Game,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/phao',
        layout: LayoutPhao,
        component: Phao,
    },
];

// required login routes
const privateRoutes = [
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/profile-v2/:link',
        component: Profile,
    },
];

export { publicRoutes, privateRoutes };
