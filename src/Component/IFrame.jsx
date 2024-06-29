import { useContext } from "react";
import { IFrameRouterContext } from "./IFrameRouteContext";


export const IFrame = () => {
    const iframeRouterContext = useContext(IFrameRouterContext);
    const { iframeVisibility, iframeRef, iframeSrc } = iframeRouterContext;

    return (
        <div className="iframe-container">
            <iframe
                src={iframeSrc}
                ref={iframeRef}
                title={"inside"}
                className={!iframeVisibility ? "iframe-invisible" : ""}
            ></iframe>
        </div>
    );
};
