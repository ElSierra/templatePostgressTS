import { Response } from "express";
import { Request } from "express";
import prisma from "../db";

export const updateUP = async (req: Request, res: Response) => {
  const updatePoint = await prisma.updatePoint.update({
    where: {
      id: req.params.id,
    },
    data: {
      updatedAt: new Date(),
      name: req.body.name,
      description: req.body.description,
    },
  });
  res.json({ data: updatePoint });
};

export const createUP = async (req: Request, res: Response) => {
  const updatePoint = await prisma.updatePoint.create({
    data: {
      updatedAt: new Date(),
      name: req.body.name,
      description: req.body.description,
      updateId: req.body.updateId,
    },
  });
  res.json({ data: updatePoint });
};

export const getUP = async (req: Request, res: Response) => {
  const updatePoint = await prisma.updatePoint.findMany({
    where: {},
  });
  res.json({ data: updatePoint });
};
export const getOneUP = async (req: Request, res: Response) => {
  const updatePoint = await prisma.updatePoint.findFirst({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: updatePoint });
};

export const deleteUP = async (req: Request, res: Response) => {
  const updatePoint = await prisma.updatePoint.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: updatePoint });
};
