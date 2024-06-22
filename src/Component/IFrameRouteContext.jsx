/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { NAVIGATION_ROUTES } from './Navigation';
import { useNavigate } from 'react-router-dom';

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

const IsInIFrameRoute = () => {
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

    // Important that it should only be called once.

    const iframeSrc = useMemo(getIFrameSource, []);
    const [iframeVisibility, setIframeVisibility] = useState(IsInIFrameRoute());
    const navigate = useNavigate();

    // --------------------------------------------------------------------------
    // Navigates our application, handling both parent routes, and IFrame routes.
    // Use this for all app routing.
    // It makes sure to handle IFrame visibility as well.
    // --------------------------------------------------------------------------

    const navigation = ({ path, isIFrame, displayedURL }) => {
        // Stop navigation to the same path.
        const currentPath = window.location.pathname;

        if (
            (isIFrame && displayedURL === currentPath) ||
            (!isIFrame && path === currentPath)
        ) {
            return;
        }

        if (isIFrame) {
            setIframeVisibility(true);
            if (iFrameRef.current) {
                iFrameRef.current.contentWindow.postMessage(
                    {
                        action: IFrameAction.NAVIGATION,
                        path,
                    },
                    IFRAME_APP_URL
                );
                navigate(displayedURL);
            }

        } else {
            setIframeVisibility(false);
            navigate(path);
        }
    };

    const handleBrowserBackAndForwardEvents = () => {
        if (IsInIFrameRoute()) {
            if (iFrameRef.current) {
                // Manually handle IFrame navigation
                setIframeVisibility(true); // You might delay this to avoid flickering of previous route in hidden iframe
                const route = getIFrameRoute();

                iFrameRef.current.contentWindow.postMessage(
                    {
                        action: IFrameAction.NAVIGATION,
                        path: route.path,
                    },
                    IFRAME_APP_URL
                );
            }
        } else {
            // BrowserRouter handles the navigation
            setIframeVisibility(false);
        }
    };

    const navigateToMainPage = () => {
        navigation(NAVIGATION_ROUTES.find(({ path }) => path === "/"));
    };

    useEffect(() => {
        if (window.location.pathname === "/") {
            navigateToMainPage();
        }

        if (iFrameRef) {
            iFrameRef.current.onload = () => {
                window.addEventListener("popstate", handleBrowserBackAndForwardEvents);
            }
        }
        return () => {
            window.removeEventListener("popstate", handleBrowserBackAndForwardEvents);
        };
    }, [])

    const contextProperties = {
        iFrameRef,
        iframeVisibility,
        setIframeVisibility,
        getIFrameRoute,
        IsInIFrameRoute,
        navigation,
        iframeSrc,
    };
    return (
        <IFrameRouterContext.Provider value={contextProperties}>
            {children}
        </IFrameRouterContext.Provider>
    );
}

