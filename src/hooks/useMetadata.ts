import { useEffect } from "react";

export const useMetadata = (pageTitle: string) => {
  useEffect(() => {
    const baseTitle = "IamThiago";
    document.title = `${baseTitle} | ${pageTitle}`;
  }, [pageTitle]);
};