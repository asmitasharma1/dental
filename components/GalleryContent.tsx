"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import GalleryPage from "./gallery-page";

export default function GalleryContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && categories.includes(category)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  return <GalleryPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;
}

const categories = [
  "All",
  "Clinic Interior",
  "Equipment",
  "Treatment Rooms",
  "Procedures",
  "Opening Day",
  "Non Profit Camp",
  "Doctor",
  "Products",
];