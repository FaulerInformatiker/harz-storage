import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Mock data for production
    const boxes = [
      {
        id: "5m2",
        size: "5m²",
        price: 25,
        available: true,
        description: "Perfect for boxes and small items",
        icon: "📦",
        currency: "€/Monat"
      },
      {
        id: "10m2", 
        size: "10m²",
        price: 45,
        available: true,
        description: "Ideal for 1-room apartment contents",
        popular: true,
        icon: "🏠",
        currency: "€/Monat"
      },
      {
        id: "20m2",
        size: "20m²", 
        price: 80,
        available: false,
        description: "Suitable for 2-3 room apartment contents",
        icon: "🏢",
        currency: "€/Monat"
      }
    ];

    return NextResponse.json(boxes);
  } catch (error) {
    console.error("Error fetching boxes:", error);
    return NextResponse.json(
      { error: "Failed to fetch boxes" },
      { status: 500 }
    );
  }
}
