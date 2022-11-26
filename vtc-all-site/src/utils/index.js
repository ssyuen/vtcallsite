import { useLocation, Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

export const isAuth = () => {
    return true
    return localStorage.getItem('LOGGED_IN') ? true : false
}

export const incrementSiteVisits = () => {
    if (window.localStorage.getItem('totalSiteVisits')) {
        let previousNumOfVisits = Number.parseInt(window.localStorage.getItem('totalSiteVisits')) + 1
        window.localStorage.setItem("totalSiteVisits", (previousNumOfVisits + 1).toString())

        setInterval(() => {
            previousNumOfVisits += 1
            window.localStorage.setItem("totalSiteVisits", (previousNumOfVisits).toString())

        }, 5000);
    }
    else {
        window.localStorage.setItem("totalSiteVisits", "1")
    }
    return localStorage.getItem('totalSiteVisits')
}
export function RequireAuth({ children }) {
    const location = useLocation();
    const { route } = useAuthenticator((context) => [context.route]);
    if (route !== 'authenticated') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}