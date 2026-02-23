"use server";

import { prisma } from "@/lib/prisma";
import { Prisma, Role } from "@prisma/client";

export async function addProperty(
  data: Prisma.PropertyCreateInput,
  role: Role,
) {
  if (!data) {
    throw new Error("No data provided");
  }
  if (role !== Role.ADMIN) {
    throw new Error("Unauthorized");
  }
  try {
    const newProperty = await prisma.property.create({
      data,
    });
    return newProperty;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create property");
  }
}

export async function getProperties() {
  try {
    const properties = await prisma.property.findMany();
    return properties;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch properties");
  }
}

export async function getPropertyById(id: number) {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id,
      },
    });
    return property;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch property");
  }
}

export async function updateProperty(
  id: number,
  data: Prisma.PropertyUpdateInput,
  role: Role,
) {
  if (!data) {
    throw new Error("No data provided");
  }
  if (role !== Role.ADMIN) {
    throw new Error("Unauthorized");
  }
  try {
    const updatedProperty = await prisma.property.update({
      where: {
        id,
      },
      data,
    });
    return updatedProperty;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update property");
  }
}

export async function deleteProperty(id: number, role: Role) {
  if (!id) {
    throw new Error("No id provided");
  }
  if (role !== Role.ADMIN) {
    throw new Error("Unauthorized");
  }
  try {
    const deletedProperty = await prisma.property.delete({
      where: {
        id,
      },
    });
    return deletedProperty;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete property");
  }
}
