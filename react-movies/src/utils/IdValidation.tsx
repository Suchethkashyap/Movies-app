import React from "react";
import RedirectToLandingPage from "./RedirectToLandingPage";

interface IdValidationProps {
  id: string | undefined;
}

function IdValidation({ id }: IdValidationProps) {
  // Validate that the id is a number
  if (!id || isNaN(Number(id))) {
    return <RedirectToLandingPage />;
  }

  return null;
}

export default IdValidation;
