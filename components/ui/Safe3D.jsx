'use client';
import { Suspense, useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

/**
 * Wraps any 3D scene with:
 * - ErrorBoundary: catches shader / WebGL runtime errors
 * - Suspense: handles async model loading
 * - WebGL detection: renders the static fallback on unsupported devices
 * - Client-only mount: skips SSR entirely (prevents hydration mismatch)
 *
 * Always pass a `fallback` that matches the 3D scene's visual weight.
 */
export default function Safe3D({ children, fallback = null, className = "" }) {
  const [mounted, setMounted] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (!gl) setSupported(false);
    } catch (e) {
      setSupported(false);
    }
  }, []);

  if (!mounted || !supported) {
    return <div className={className}>{fallback}</div>;
  }
  return (
    <ErrorBoundary fallback={<div className={className}>{fallback}</div>}>
      <Suspense fallback={<div className={className}>{fallback}</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
