import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { mallValidationSchema } from 'validationSchema/malls';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.mall
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMallById();
    case 'PUT':
      return updateMallById();
    case 'DELETE':
      return deleteMallById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMallById() {
    const data = await prisma.mall.findFirst(convertQueryToPrismaUtil(req.query, 'mall'));
    return res.status(200).json(data);
  }

  async function updateMallById() {
    await mallValidationSchema.validate(req.body);
    const data = await prisma.mall.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMallById() {
    const data = await prisma.mall.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
