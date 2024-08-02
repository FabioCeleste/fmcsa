import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const where: any = {};

      const { limit = 15, page = 1 } = req.query;

      const {
        dbaName,
        legalName,
        physicalAddress,
        phone,
        dot,
        powerUnits,
        mcMxFF,
        createdDT,
        modifiedDT,
        outOfServiceDate,
        operatingStatus,
        entity,
      } = req.body;

      if (dbaName) {
        where.dbaName = { contains: dbaName };
      }

      if (legalName) {
        where.legalName = { contains: legalName };
      }

      if (physicalAddress) {
        where.physicalAddress = { contains: physicalAddress };
      }

      if (phone) {
        where.phone = { contains: phone };
      }

      if (operatingStatus) {
        where.operatingStatus = { contains: operatingStatus };
      }

      if (dot) {
        where.dot = parseInt(dot);
      }

      if (powerUnits) {
        where.powerUnits = parseInt(powerUnits);
      }

      if (mcMxFF) {
        where.mcmxff = { contains: mcMxFF };
      }

      if (createdDT) {
        const createdDTStartOfDay = new Date(createdDT);
        createdDTStartOfDay.setHours(0, 0, 0, 0);

        const createdDTEndOfDay = new Date(createdDT);
        createdDTEndOfDay.setHours(23, 59, 59, 999);
        where.createdDT = {
          gte: createdDTStartOfDay,
          lte: createdDTEndOfDay,
        };
      }

      if (modifiedDT) {
        const modifiedDTStartDay = new Date(modifiedDT);
        modifiedDTStartDay.setHours(0, 0, 0, 0);

        const modifiedDTEndOfDay = new Date(modifiedDT);
        modifiedDTEndOfDay.setHours(23, 59, 59, 999);
        where.modifiedDT = {
          gte: modifiedDTStartDay,
          lte: modifiedDTEndOfDay,
        };
      }

      if (entity) {
        const whereConditionEntity = entity.map((str: string) => ({
          entity: {
            contains: str,
          },
        }));

        where.AND = whereConditionEntity;
      }

      if (outOfServiceDate) {
        const outOfServiceDateStartDay = new Date(outOfServiceDate);
        outOfServiceDateStartDay.setHours(0, 0, 0, 0);

        const outOfServiceDateEndOfDay = new Date(outOfServiceDate);
        outOfServiceDateEndOfDay.setHours(23, 59, 59, 999);
        where.outOfServiceDate = {
          gte: outOfServiceDateStartDay,
          lte: outOfServiceDateEndOfDay,
        };
      }

      const result = await prisma.truckCompany.findMany({
        take: parseInt(limit as string),
        skip: (parseInt(page as string) - 1) * parseInt(limit as string),
        where,
      });

      const formattedResult = result.map((result) => ({
        ...result,
        createdDT: result.createdDT
          ? format(result.createdDT, "MM-dd-yyyy")
          : null,
        modifiedDT: result.modifiedDT
          ? format(result.modifiedDT, "MM-dd-yyyy")
          : null,
        outOfServiceDate: result.outOfServiceDate
          ? format(result.outOfServiceDate, "MM-dd-yyyy")
          : null,
      }));

      const totalCount = await prisma.truckCompany.count({
        where,
      });

      res.status(200).json({
        data: formattedResult,
        total: totalCount,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Something went wrong" });
    }
  }
}
