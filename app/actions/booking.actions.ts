"use server";

import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/nodemailer";
import { revalidatePath } from "next/cache";

export async function createBooking(data: {
  propertyId: number;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: Date;
  time: string;
}) {
  try {
    const booking = await prisma.booking.create({
      data,
    });

    const property = await prisma.property.findUnique({
      where: { id: data.propertyId },
    });

    // Send email notification
    await transporter.sendMail({
      from: `"Realty Booking" <${process.env.SMTP_USER}>`,
      to: "davisbeen@gmail.com", // Send to admin
      subject: `New Tour Request: ${property?.title || "Property ID: " + data.propertyId}`,
      html: `
        <h1>New Booking Request</h1>
        <p><strong>Property:</strong> ${property?.title || "N/A"}</p>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Preferred Date:</strong> ${new Date(data.preferredDate).toLocaleDateString()}</p>
        <p><strong>Preferred Time:</strong> ${data.time}</p>
      `,
    });

    return { success: true, booking };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

export async function getBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { preferredDate: "desc" },
    });

    // Enrich bookings with property titles if possible
    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const property = await prisma.property.findUnique({
          where: { id: booking.propertyId },
          select: { title: true },
        });
        return {
          ...booking,
          propertyTitle: property?.title || "Unknown Property",
        };
      }),
    );

    return enrichedBookings;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

export async function deleteBooking(id: number) {
  try {
    await prisma.booking.delete({
      where: { id },
    });
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return { success: false, error: "Failed to delete booking" };
  }
}
