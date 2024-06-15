import React, { useContext } from "react";
import logo from "../assets/react.svg"

export const NAVIGATION_ROUTES = [
    {
        title: "IFrame Route One - Dashboard",
        path: "/",
        displayedURL: "/app/",
        isIFrame: true,
    },
    {
        title: "IFrame Route Two - Events",
        path: "/events",
        displayedURL: "/app/events",
        isIFrame: true,
    },
    {
        title: "IFrame Nested Route - Daily Events",
        displayedURL: "/app/events/daily",
        path: "/events/daily",
        isIFrame: true,
    },
    { title: "Parent Route", path: "/parentRoute" },
    { title: "Parent Nested Route", path: "/parentRoute/nested" },
];

export const Navigation = () => {
    const iFrameRouteContext = useContext(iFrameRouteContext);
    return (
        <div>
            <ul>
                <div>
                    <img src={logo} alt="logo" />
                    <h2>Navigation</h2>
                </div>
                {NAVIGATION_ROUTES.map((route, index) => (
                    <li
                        key={index}
                        value={route.title}
                        onClick={() => iFrameRouteContext.navigate(route)}
                    >
                        {route.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}
