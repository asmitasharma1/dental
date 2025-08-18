import { Suspense } from "react";
import GalleryContent from "@/components/GalleryContent";

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <GalleryContent />
    </Suspense>
  );
}