"use client";

import { useParams } from "next/navigation";
import HotelDetailPage from "../../components/HotelDetailPage";

export default function HotelPage() {
  // Use useParams to get the ID from the URL path segment
  const params = useParams();
  const id = params?.id ? String(params.id) : "";

  if (!id) {
    return <div>Hotel ID not found</div>; // Handle undefined case
  }

  return <HotelDetailPage id={id} />;
}
