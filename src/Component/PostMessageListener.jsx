import React, { useEffect } from "react";
import { IFrameAction } from "./IFrameRouteContext";

// In case you want to act upon message recevied from the IFrame.
export const PostMessageListener = () => {
    useEffect(() => {
        window.addEventListener("message", (event) => {
            // Accept only specific origins messages.
            // if (event.origin !==  "https://..") {
            //   console.log('Incorrect origin',event.origin);
            //   return;
            // }
            const message = event && event.data;
            const action = message && message.action;

            // Example of acting on a messages from the child iframe.
            if (action === IFrameAction.REFRESH) {
                window.location.reload();
            }
        });
    }, []);

    return <></>;
};