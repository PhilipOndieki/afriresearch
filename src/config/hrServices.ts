
export type HrService = {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string; // SVG path data
};

export type HrServiceGroup = {
  id: number;
  groupTitle: string;
  groupSlug: string;
  summary: string;
  services: HrService[];
};

export const hrServiceGroups: HrServiceGroup[] = [
  {
    id: 1,
    groupTitle: 'Workforce Analytics & Compensation',
    groupSlug: 'workforce-analytics-compensation',
    summary:
      'Data-driven insights into your workforce structure, compensation equity, and market positioning to inform strategic HR decisions.',
    services: [
      {
        id: 1,
        slug: 'job-evaluation',
        title: 'Job Evaluation',
        description:
          'Systematic assessment of job roles to establish internal equity and a consistent grading framework. We apply recognised methodologies to ensure every role is valued fairly relative to its contribution to the organisation.',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      },
      {
        id: 2,
        slug: 'salary-surveys',
        title: 'Salary Surveys',
        description:
          'Comprehensive market remuneration surveys that benchmark your pay scales against industry peers across Kenya and East Africa. Our surveys give you the data needed to attract, retain, and motivate top talent competitively.',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      },
      {
        id: 3,
        slug: 'executive-recruitment-payroll',
        title: 'Executive Recruitment & Payroll Management',
        description:
          'End-to-end recruitment for senior and specialist roles, paired with rigorous payroll management services. We identify the right talent and ensure compliant, accurate, and timely payroll processing.',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      },
    ],
  },
  {
    id: 2,
    groupTitle: 'Organisational Health & Compliance',
    groupSlug: 'organisational-health-compliance',
    summary:
      'Audits, assessments, and compliance frameworks that keep your organisation legally sound, physically safe, and strategically aligned.',
    services: [
      {
        id: 4,
        slug: 'human-resource-audit',
        title: 'Human Resource Audit',
        description:
          'A thorough review of your HR practices, policies, and systems against legal requirements and best practice standards. We deliver a detailed findings report with prioritised recommendations for improvement.',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      },
      {
        id: 5,
        slug: 'osha-audit',
        title: 'OSHA Audit',
        description:
          'Occupational Safety and Health compliance audits conducted against the Occupational Safety and Health Act (Kenya). We identify workplace hazards, assess risk controls, and produce actionable corrective action plans.',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      },
      {
        id: 6,
        slug: 'work-environment-surveys',
        title: 'Work Environment Surveys',
        description:
          'Structured employee engagement and climate surveys that surface the real state of your workplace culture, morale, and management effectiveness. Results are benchmarked and presented with clear improvement priorities.',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      },
    ],
  },
  {
    id: 3,
    groupTitle: 'Capacity Building & Systems',
    groupSlug: 'capacity-building-systems',
    summary:
      'Strengthening your HR function from the inside through training, policy frameworks, and the technology systems that make HR work at scale.',
    services: [
      {
        id: 7,
        slug: 'training-needs-assessment',
        title: 'Training Needs Assessment',
        description:
          'A structured analysis of skills gaps across your workforce, aligned to organisational strategy. We produce a prioritised training plan and can design or source appropriate development programmes.',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      },
      {
        id: 8,
        slug: 'hr-policy-manual',
        title: 'HR Policy Manual Development & Review',
        description:
          'Development of comprehensive HR policy manuals and employee handbooks tailored to your organisation, sector, and the Employment Act (Kenya). We also review and update existing policies to close gaps and reflect current law.',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      },
      {
        id: 9,
        slug: 'hrmis-installation-induction',
        title: 'HRMIS Installation & Induction',
        description:
          'Selection, installation, configuration, and staff induction for Human Resource Management Information Systems. We guide you from vendor evaluation through go-live, ensuring your team can use the system effectively from day one.',
        icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
      },
    ],
  },
];

export const allHrServices: HrService[] = hrServiceGroups.flatMap((g) => g.services);