import { Request, Response } from "express";
import prisma from "../db";

export const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });
  if (!product) {
    return res.json({ message: "nope" });
  }
  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      asset: req.body.asset,
      version: req.body.version,
      productId: req.body.productId,
      updatedAt: new Date(),
    },
  });
  res.json({ data: update });
};

export const updateUpdate = async (req: any, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates: any, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update: any) => {
    return update.id === req.params.id;
  });
  if (!match) {
    return res.json({ message: "nope" });
  } else {
    const update = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        asset: req.body.asset,
        version: req.body.version,
        updatedAt: new Date(),
      },
    });
    res.json({ data: update });
  }
};

export const getUpdate = async (req: any, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates: any, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({
    data: updates,
  });
};
export const getOneUpdate = async (req: Request, res: Response) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};
export const deleteUpdate = async (req: any, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates: any, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update: any) => {
    return update.id === req.params.id;
  });
  if (!match) {
    res.json({ message: "nope" });
  } else {
    const update = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: update });
  }
};
