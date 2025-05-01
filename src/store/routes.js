import { lazy } from "react";

const BusinesswithArticlesForm = lazy(() =>
  import("../pages/BusinesswithArticlesForm")
);
const BusinessList = lazy(() => import("../pages/BusinessList"));
const routes = [
  {
    path: "/add-business",
    element: <BusinesswithArticlesForm />,
  },
  {
    path: "/",
    element: <BusinessList />,
  },
];

export { routes };
