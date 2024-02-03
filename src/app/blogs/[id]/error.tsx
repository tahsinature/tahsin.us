"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container">
      <div className="mt-5">
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Article not found or, something went wrong.</AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default NotFound;
