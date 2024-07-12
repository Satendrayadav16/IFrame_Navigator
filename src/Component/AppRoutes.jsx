/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom";

export const Layout = ({ children }) => {
    return <div className="layout">{children}</div>;
};

const ParentRoute = () => (
    <Layout>
        <h1>Parent App Route</h1>
    </Layout>
);
const NestedParentRoute = () => (
    <Layout>
        <h1>Parent App Nested Route</h1>
    </Layout>
);

export const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/parentRoute" component={ParentRoute} />
            <Route exact path="/parentRoute/nested" component={NestedParentRoute} />
        </Routes>
    );
};
