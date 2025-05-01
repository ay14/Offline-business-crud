import { lazy } from "react";

const BusinesswithArticlesForm = lazy(() =>
  import("../components/BusinesswithArticlesForm")
);

const routes = [
  {
    path: "/create-business",
    element: <BusinesswithArticlesForm />,
  },
];

export { routes };
