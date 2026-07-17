import { initializeOrganization } from '@/actions/organization/lib/initialize-organization';
import { auth } from '@/utils/auth';
import { db } from '@db/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const DEFAULT_FRAMEWORK_IDS = [
  'frk_682734f304cbbfdb3a9d4f44', // SOC 2 v.1
  'frk_681ecc34e85064efdbb76993', // ISO 27001
];

export async function GET(request: NextRequest) {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });

  if (!session?.user?.id) {
    redirect('/auth');
  }

  const cookie = h.get('cookie') || '';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

  const meRes = await fetch(`${apiUrl}/v1/auth/me`, {
    headers: { cookie },
    cache: 'no-store',
  });
  const me = await meRes.json();
  const orgs = me?.organizations ?? [];

  if (orgs.length > 0) {
    const activeOrgId = session.session.activeOrganizationId || orgs[0].id;
    redirect(`/${activeOrgId}`);
  }

  const orgName = session.user.name
    ? `${session.user.name}'s Organization`
    : 'My Organization';

  const newOrg = await db.organization.create({
    data: {
      name: orgName,
      hasAccess: true,
      onboardingCompleted: false,
      members: {
        create: {
          userId: session.user.id,
          role: 'owner',
        },
      },
    },
  });

  const orgId = newOrg.id;

  await db.onboarding.create({
    data: {
      organizationId: orgId,
      triggerJobCompleted: false,
    },
  });

  await initializeOrganization({
    frameworkIds: DEFAULT_FRAMEWORK_IDS,
    organizationId: orgId,
  });

  const ownerMember = await db.member.findFirst({
    where: { userId: session.user.id, organizationId: orgId },
  });
  if (ownerMember) {
    await db.employeeTrainingVideoCompletion.createMany({
      data: [
        { memberId: ownerMember.id, videoId: '01-security-awareness' },
        { memberId: ownerMember.id, videoId: '02-data-protection' },
        { memberId: ownerMember.id, videoId: '03-incident-response' },
      ],
      skipDuplicates: true,
    });
  }

  await auth.api.setActiveOrganization({
    headers: h,
    body: { organizationId: orgId },
  });

  redirect(`/${orgId}`);
}
