import React, { useRef } from 'react';
import { NAVIGATION_ROUTES } from './Navigation';

export const IFrameAction = {
    NAVIGATION: "NAVIGATION",
    REFRESH: "REFRESH"
};

const initial = {};

export const IFrameRouterContext = React.createContext(initial);

export const IFRAME_APP_URL = "http://localhost:8001";

const getIFrameRoute = () => {
    return NAVIGATION_ROUTES.find((route) =>
        route.displayedURL === window.location.pathname
    )
};

const IFrameRoute = () => {
    return !!getIFrameRoute();
};

const getIFrameSource = () => {
    const iFrameRoute = getIFrameRoute();
    if (iFrameRoute) {
        return IFRAME_APP_URL + iFrameRoute.path;
    }
    return IFRAME_APP_URL;
}

export const IFrameRouteContextProvider = ({ children }) => {
    const iFrameRef = useRef(null);

    return (
        <div>

        </div>
    )
}

