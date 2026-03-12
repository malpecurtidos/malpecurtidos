import { useRouteLoaderData } from "react-router";

type RootLoaderData = {
  formSecurity?: {
    csrfToken: string;
    submittedAt: string;
  };
};

export function useFormSecurity() {
  const rootData = useRouteLoaderData("root") as RootLoaderData | undefined;

  return {
    csrfToken: rootData?.formSecurity?.csrfToken ?? "",
    submittedAt: rootData?.formSecurity?.submittedAt ?? "",
  };
}
