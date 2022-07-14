import LayoutBasic from '../layouts/LayoutBasic';

import UserHome from '../pages/UserHome';
import UserGuest from '../pages/UserGuest';

import Error404 from '../pages/Error404';

const routes = [
    {
        path: '/',
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: '/',
                component: UserHome,
                exact: true,
            },
            {
                path: '/login',
                component: UserGuest,
                exact: true,
            },
            // at the end
            {
                component: Error404,
            },
        ]
    }
]

export default routes;
