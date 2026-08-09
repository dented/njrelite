"use client";

import { useEffect } from "react";

const BootstrapClient = () => {
  useEffect(() => {
    // Loads Bootstrap's JS on the client so data-bs components work.
    // Expose it on window for any legacy code paths.
    void import("bootstrap/dist/js/bootstrap.bundle.min.js").then((mod) => {
      (window as unknown as { bootstrap?: unknown }).bootstrap = mod;
    });
  }, []);

  return null;
};

export default BootstrapClient;
