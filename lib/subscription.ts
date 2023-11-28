import { auth } from '@clerk/nextjs';
import prismadb from './prismadb';

const DAY_IN_MS = 86_400_00;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const user = await prismadb.amigosUser.findUnique({
    where: {
      userId,
    },
    select: {
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!user) return false;

  const isValid =
    user.stripeSubscriptionId &&
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
