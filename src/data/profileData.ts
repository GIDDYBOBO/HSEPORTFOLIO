import { Credential, CareerMilestone, Publication, LeadershipRole, AwardItem } from '../types';

export const PROFILE_SUMMARY = {
  fullName: "Engr. Iyenoma ThankGod Osazee",
  displayName: "Engr. Iyenoma T. Osazee",
  salutation: "Engr.",
  designations: "CMIOSH, MNSE, Fellow ISPON, MNISafetyE",
  primaryTitle: "Health, Safety & Environment Manager",
  organization: "Julius Berger Nigeria PLC",
  location: "Abuja, Nigeria",
  summaryHeadline: "Bridging Engineering Rigor, Occupational Health & Sustainable Construction",
  bioOverview: "Engr. Iyenoma ThankGod Osazee is an acclaimed Nigerian health, safety, and environment professional whose career spans over two decades at the forefront of the Nigerian construction industry. Siting at the rare nexus of civil engineering and occupational hygiene, he unites high-level academic research, international safety standards (ISO 45001 & ISO 14001), and frontline mega-infrastructure execution.",
  email: "contact@iyenomaosazee.com",
  contactLocation: "Abuja Corporate Liaison, FCT, Nigeria",
  yearsExperience: "22+",
  worldCongressSelected: "Top 1,100+",
  papersPublished: "4+",
};

export const CREDENTIALS: Credential[] = [
  {
    id: "cmiosh",
    title: "Chartered Safety and Health Professional",
    designation: "CMIOSH",
    issuer: "Institution of Occupational Safety and Health (IOSH), United Kingdom",
    year: "Issued Dec 2013",
    credentialId: "Credential ID: 100175",
    description: "Highest level of professional chartered qualification in global occupational health and safety. Actively serves on the IOSH Chartered Membership Peer Review Interview Panel.",
    highlight: true
  },
  {
    id: "mnse",
    title: "Registered Professional Engineer",
    designation: "MNSE",
    issuer: "Nigerian Society of Engineers (NSE)",
    description: "Corporate member of Nigeria's premier engineering authority, applying civil and structural principles to systemic safety design.",
    highlight: true
  },
  {
    id: "ispon-fellow",
    title: "Fellow of the Institute",
    designation: "Fellow ISPON",
    issuer: "Institute of Safety Professionals of Nigeria (ISPON)",
    description: "Fellowship recognized by The Guardian and Forefront for lifetime leadership and institutional contributions to safety regulation in Nigeria.",
    highlight: true
  },
  {
    id: "iso45001",
    title: "Certified Lead Auditor",
    designation: "ISO 45001 OHSMS Lead Auditor",
    issuer: "Capable People / CQI | IRCA Learning",
    year: "Issued July 2022",
    credentialId: "Credential ID: 423290",
    description: "Global certification for conducting third-party and corporate audits of Occupational Health and Safety Management Systems.",
    highlight: false
  },
  {
    id: "mnisafetye",
    title: "Member & Technical Reviewer",
    designation: "MNISafetyE",
    issuer: "Nigerian Institute of Safety and Engineering",
    description: "Technical reviewer for national construction health and safety guidance documents under NISafetyE SME division.",
    highlight: false
  },
  {
    id: "bsc-cert",
    title: "International Certificate in OSH",
    designation: "British Safety Council Cert",
    issuer: "British Safety Council, United Kingdom",
    year: "Achieved 2000s",
    description: "Foundational international benchmark in occupational health hazards, ergonomics, and workplace risk assessment.",
    highlight: false
  },
  {
    id: "hse-directorship",
    title: "Executive Safety Governance Masterclass",
    designation: "Executive Safety Governance",
    issuer: "Julius Berger Nigeria PLC Corporate HSE Academy",
    year: "Ongoing Senior Mandate",
    credentialId: "JBN-HSE-DIR-2006",
    description: "Operational mastery in leading high-consequence civil engineering safety regimes across complex river bridge construction and federal transport corridors.",
    highlight: true,
    verificationStatus: "Verified"
  },
  {
    id: "iosh-panelist",
    title: "Chartered Membership Peer Review Interview Panelist",
    designation: "Peer Review Interviewer",
    issuer: "Institution of Occupational Safety and Health (IOSH), United Kingdom",
    year: "Appointed 2025",
    credentialId: "IOSH UK Assessment Ref: 100175/PRI",
    description: "Formally designated peer interviewer vetting international senior safety practitioners applying for Chartered Safety and Health Professional (CMIOSH) standing.",
    highlight: true,
    verificationStatus: "Chartered"
  },
  {
    id: "parliamentary-advisory",
    title: "Statutory Reform Expert Advisor",
    designation: "Parliamentary Mediation Panelist",
    issuer: "House of Representatives Committee on Safety Standards, National Assembly of Nigeria",
    year: "2023 – 2025",
    credentialId: "NASS-HR-CSSR-2023",
    description: "Statutory appointment arbitrating the ISPON leadership dispute under the ISPON Act 2014, restoring national regulatory governance and fair elections.",
    highlight: true,
    verificationStatus: "Verified"
  }
];

export const ACADEMIC_QUALIFICATIONS = [
  {
    degree: "MSc in Occupational and Environmental Health and Safety Management",
    institution: "University of Portsmouth, United Kingdom",
    period: "2006 – 2010",
    detail: "Awarded the British Occupational Hygiene Society (BOHS) bursary in 2007 to support this master's research. Thesis and curriculum united industrial hygiene, chemical and biological exposures, and systemic environmental governance.",
    badge: "BOHS Bursary Winner"
  },
  {
    degree: "MSc in Civil Engineering and Construction Management",
    institution: "Heriot-Watt University, Edinburgh, United Kingdom",
    period: "2016 – 2018",
    detail: "Advanced postgraduate engineering training bridging structural integrity, large-scale project risk, infrastructure logistics, and sustainable asset management.",
    badge: "Postgraduate Engineering"
  },
  {
    degree: "Higher National Diploma (HND) in Civil & Building Engineering",
    institution: "Accredited Nigerian Polytechnic Institution",
    period: "Engineering Foundation",
    detail: "Formed the structural, surveying, and material sciences baseline that underpins his engineering approach to physical construction hazards.",
    badge: "Civil Foundation"
  }
];

export const CAREER_HISTORY: CareerMilestone[] = [
  {
    period: "June 2006 – Present",
    role: "Health, Safety and Environment (HSE) Manager",
    organization: "Julius Berger Nigeria PLC",
    location: "Abuja, Nigeria",
    scope: "Executive oversight of occupational health, civil engineering safety, environmental impact protocols, and ISO 45001/14001 compliance across multi-million dollar infrastructure projects.",
    highlights: [
      "Directs enterprise-wide HSE strategy, contractor auditing, and environmental compliance across complex bridge, highway, and civil construction undertakings.",
      "Championed ISO 45001 (OHSMS) and ISO 14001 (EMS) management systems implementation.",
      "Spearheads occupational hygiene monitoring programs addressing tropical heat stress, airborne particulates, and hazardous noise on major sites.",
      "Mentored hundreds of safety supervisors and engineers across the Federation."
    ]
  },
  {
    period: "September 2002 – January 2006",
    role: "HSE Senior Supervisor",
    organization: "Julius Berger Nigeria PLC",
    location: "Abuja, Nigeria",
    scope: "Field supervision of high-risk civil operations, technical hazard identification, workforce safety training, and incident investigation.",
    highlights: [
      "Supervised frontline engineering teams during pivotal national capital infrastructure expansions.",
      "Formulated site-specific risk assessments, lifting plans, and deep excavation protection protocols.",
      "Established foundational reporting mechanisms that improved proactive near-miss reporting across site operations."
    ]
  },
  {
    period: "December 2000 Legacy",
    role: "Safety Section Contributor (Central Bank of Nigeria HQ Site)",
    organization: "Julius Berger Nigeria PLC",
    location: "Abuja, Nigeria",
    scope: "Contributed to the safety operations at the landmark Central Bank of Nigeria Headquarters construction site.",
    highlights: [
      "The Julius Berger safety section at the CBN Headquarters site was recognized for benchmark site safety compliance and rigorous risk controls."
    ]
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-landfill-consequences",
    title: "Environmental Consequences of Poor Landfill Management",
    authors: ["Iyenoma ThankGod Osazee", "Prof. Bhaskar Sen Gupta"],
    journal: "Peer-Reviewed Environmental Science & Engineering Journal",
    volume: "Vol. 2",
    issue: "Issue 2",
    pages: "pp. 8–14",
    publishedDate: "15 March 2021",
    doi: "10.24018/ejgeo.2021.2.2.117",
    url: "https://doi.org/10.24018/ejgeo.2021.2.2.117",
    abstract: "This paper critically examines the environmental and public health ramifications associated with unscientific municipal and industrial landfill management. It investigates the dynamics of fugitive greenhouse gas emissions—predominantly methane (CH4) and carbon dioxide (CO2)—alongside subterranean aquifer contamination via toxic leachate migration. The research demonstrates how engineered containment, coupled with landfill-gas-to-energy (LFGTE) capture, transforms hazardous waste sinks into sustainable regional energy assets.",
    keyThemes: ["Landfill Management", "Greenhouse Gas Emissions (Methane/CO2)", "Leachate Migration", "Waste-to-Energy (LFGTE)", "Environmental Hygiene"],
    keyFindings: [
      "Improperly lined landfills generate high volumes of volatile organic compounds and potent GHGs with 28x global warming potential over 100 years.",
      "Engineered leachate collection and biological treatment barriers prevent long-term heavy metal percolation into local water tables.",
      "Landfill-gas-to-energy recovery delivers viable dual outcomes: mitigating atmospheric methane release while generating localized off-grid electricity."
    ],
    citation: "Osazee, I. T., & Sen Gupta, B. (2021). Environmental Consequences of Poor Landfill Management. Peer-Reviewed Environmental Engineering Research, 2(2), 8–14. https://doi.org/10.24018/ejgeo.2021.2.2.117",
    type: "journal"
  },
  {
    id: "pub-landfill-sustainable",
    title: "Landfill in a Sustainable Waste Disposal",
    authors: ["Iyenoma ThankGod Osazee"],
    journal: "Peer-Reviewed Environmental Science & Engineering Journal",
    volume: "Vol. 2",
    issue: "Issue 4",
    pages: "pp. 67–74",
    publishedDate: "20 August 2021",
    doi: "10.24018/ejgeo.2021.2.4.165",
    url: "https://doi.org/10.24018/ejgeo.2021.2.4.165",
    abstract: "Extending the inquiry into circular waste economics, this paper evaluates the systemic viability of landfill sites within contemporary integrated waste management frameworks. It presents quantitative parameters governing leachate composition, methane production kinetics, and recycling integration. The paper establishes an operational methodology for retrofitting existing open dumpsites into controlled sanitary containment facilities, minimizing ecological footprints in developing urban ecosystems.",
    keyThemes: ["Sustainable Waste Disposal", "Methane Kinetics", "Leachate Attenuation", "Recycling Integration", "Developing Nation Infrastructure"],
    keyFindings: [
      "Landfills cannot remain end-of-pipe dumping zones; they must be structured as integrated bioreactor cells within municipal recycling loops.",
      "Comprehensive surface capping systems dramatically cut surface rainwater ingress, the primary catalyst of high-volume toxic leachate formation.",
      "Proposes an indexed environmental vulnerability score to benchmark waste disposal sites before licensing."
    ],
    citation: "Osazee, I. T. (2021). Landfill in a Sustainable Waste Disposal. Peer-Reviewed Environmental Engineering Research, 2(4), 67–74. https://doi.org/10.24018/ejgeo.2021.2.4.165",
    type: "journal"
  },
  {
    id: "pub-thermal-hazards",
    title: "Hazards and Risks Presented by the Thermal Environment",
    authors: ["Engr. Iyenoma T. Osazee (MSc OEHSM, MSc CECM, MNSE, CMIOSH)"],
    journal: "ResearchGate Technical Monograph",
    publishedDate: "April 2021",
    url: "https://www.researchgate.net",
    abstract: "A comprehensive investigation into the physiological, operational, and managerial hazards posed by thermal extremes in outdoor industrial environments, notably construction, civil engineering, and extractive operations. The monograph synthesizes empirical heat-stress indices—including bioclimatic thermal metrics and Wind Chill Index—and establishes an actionable hierarchy of engineering controls, metabolic work/rest regimens, worker hydration protocols, and continuous environmental bioclimatic monitoring.",
    keyThemes: ["Thermal Environment", "Heat Stress & Heat Stroke", "Bioclimatic Heat Indices", "Work/Rest Cycles", "Occupational Hygiene Controls"],
    keyFindings: [
      "Thermal extremes induce acute neurovascular impairment, escalating heavy machinery accidents well before clinical heat collapse occurs.",
      "Adherence to calibrated bioclimatic threshold limit values (TLVs) alongside structured 45/15 or 30/30 work-rest regimens lowers heat morbidity by up to 85%.",
      "Hydration protocols must mandate electrolyte supplementation rather than unmeasured plain water intake during sustained 35°C+ high-humidity shifts."
    ],
    citation: "Osazee, I. T. (2021). Hazards and Risks presented by the Thermal Environment. Technical Monograph, ResearchGate. https://www.researchgate.net/publication/351052674",
    type: "technical_paper"
  },
  {
    id: "pub-world-congress",
    title: "Health and Safety Practice for the Construction Small and Medium Enterprises",
    authors: ["Engr. Iyenoma T. Osazee"],
    journal: "23rd World Congress on Safety and Health at Work (Sydney, Australia)",
    publishedDate: "Sydney 2023 Selection",
    abstract: "Abstract competitively selected from over 1,100 international submissions for presentation at the 23rd World Congress in Sydney, Australia. Analyzes systemic vulnerabilities and resource constraints impeding safety compliance in Small and Medium Enterprises (SMEs) across developing construction sectors, outlining scalable, low-cost safety management interventions.",
    keyThemes: ["Construction SMEs", "Global Occupational Safety", "International Labor Standards", "Resource-Constrained Safety Systems"],
    keyFindings: [
      "SMEs represent over 80% of the subcontracted construction labor force in emerging economies but suffer disproportionately from lack of institutional compliance systems.",
      "Outlines a modular, non-punitive safety coaching framework that scales tier-1 contractor safety cultures down to informal sub-tier artisans."
    ],
    citation: "Osazee, I. T. (2023). Health and Safety Practice for the Construction Small and Medium Enterprises. Abstract accepted, 23rd World Congress on Safety and Health at Work, Sydney, Australia.",
    type: "world_congress"
  },
  {
    id: "pub-nisafetye-guidance",
    title: "National Construction Health and Safety Guidance Document",
    authors: ["Engr. Iyenoma Osazee (Reviewer)", "Engr. Kayode Fowode (Collator)", "NISafetyE National Chairman (Approved)"],
    journal: "Nigerian Institute of Safety and Engineering (NISafetyE)",
    publishedDate: "2023",
    abstract: "Reviewed national industry guidance manual establishing standardized safety specifications, scaffold inspections, crane operations, and personal protective equipment standards for civil engineering projects across Nigeria.",
    keyThemes: ["Construction Safety Guidelines", "National Engineering Standard", "NISafetyE / SME Division"],
    keyFindings: [
      "Codified mandatory pre-commencement structural safety audits for public building works.",
      "Standardized documentation requirements for temporary works design and trench shoring."
    ],
    citation: "NISafetyE. (2023). Construction Health and Safety Guidance Document (Reviewer: Engr. I. Osazee, MNSE, MNISafetyE, CMIOSH). Nigerian Institute of Safety and Engineering.",
    type: "national_guidance"
  }
];

export const LEADERSHIP_ROLES: LeadershipRole[] = [
  {
    period: "September 2025 – Present",
    role: "Chartered Membership Peer Review Interview Panel Member",
    organization: "Institution of Occupational Safety and Health (IOSH), UK",
    category: "governance",
    impactSummary: "Entrusted by the world's chartered professional body to evaluate senior safety professionals seeking Chartered Member (CMIOSH) status.",
    details: "Conducts rigorous peer assessment interviews evaluating strategic leadership, ethical compliance, risk management competency, and occupational health knowledge of international candidates."
  },
  {
    period: "May 2023 – December 2025",
    role: "Mediator & Expert Advisor (ISPON Institutional Reform)",
    organization: "House of Representatives Committee on Safety Standards and Regulation, National Assembly of Nigeria",
    category: "governance",
    impactSummary: "Facilitated the historic resolution of ISPON's factional leadership crisis under the ISPON Act 2014, restoring unified national council governance.",
    details: "Appointed to the National Assembly sub-committee reviewing dispute documentation, conducting institutional sittings, formulating strict financial and electoral guidelines, and restoring statutory governance to Nigeria's apex safety institute."
  },
  {
    period: "January 2020 – November 2023",
    role: "Chairman, North Central Region (Abuja)",
    organization: "IOSH West Africa Division",
    category: "institutional",
    impactSummary: "Spearheaded regional OSH professional development, multinational webinars, technical seminars, and student mentorship across Nigeria's Federal Capital Territory.",
    details: "Mobilized industry leaders, civil service directors, and health professionals to advance evidence-based safety standards and elevate professional membership in North Central Nigeria."
  },
  {
    period: "October – December 2021",
    role: "Chairman, Election Committee",
    organization: "IOSH West Africa Division",
    category: "governance",
    impactSummary: "Successfully organized and superintended transparent, digital elections for the executive leadership of the IOSH West Africa Division.",
    details: "Formulated electoral codes of conduct, vetted eligible candidacies, and delivered an unimpeachable democratic transition across member branches."
  },
  {
    period: "2021 Keynote Session",
    role: "Keynote Speaker",
    organization: "IOSH West Africa Annual Conference",
    category: "speaking",
    impactSummary: "Delivered keynote addresses alongside international representatives from IOSH and the World Health Organization (WHO), covered by The Guardian.",
    details: "Addressed multinational delegations on transforming construction safety cultures from bureaucratic compliance to human-centered resilience."
  },
  {
    period: "Former Executive Term",
    role: "Secretary General (Former)",
    organization: "Institute of Safety Professionals of Nigeria (ISPON)",
    category: "institutional",
    impactSummary: "Led the executive secretariat, advocating for national statutory recognition and professionalization of safety practice across Nigerian industries.",
    details: "Managed member communications, regulatory interfaces with federal ministries, and statutory compliance initiatives."
  }
];

export const AWARDS_AND_HONORS: AwardItem[] = [
  {
    title: "Africa's Top 50 Sustainability Experts (Inaugural Listing)",
    year: "December 2023",
    awardingBody: "NatureNews Africa",
    category: "individual",
    description: "Formally selected in NatureNews Africa's maiden continental ranking recognizing visionary professionals driving sustainable environmental practices, circular waste solutions, and corporate ecological stewardship.",
    notes: "Publicly celebrated by peers across the African continent for linking civil engineering infrastructure with planetary health."
  },
  {
    title: "British Occupational Hygiene Society (BOHS) Bursary Award",
    year: "January 2007",
    awardingBody: "British Occupational Hygiene Society (BOHS), United Kingdom",
    category: "individual",
    description: "Highly competitive international educational bursary funding tuition toward the MSc in Occupational and Environmental Health and Safety Management at the University of Portsmouth.",
    notes: "Published in BOHS Newsletter; recognized his pioneering vision to integrate occupational hygiene into West African civil engineering."
  },
  {
    title: "Professor Itse Sagay Prize in Law of Contract",
    year: "July / August 2012",
    awardingBody: "Chartered Institute of Arbitrators Nigeria (CIAN)",
    category: "individual",
    description: "Distinguished academic prize awarded for outstanding performance in the Part 1 Examination in the Law of Contract conducted by CIAN.",
    notes: "Demonstrates intellectual mastery extending into legal jurisprudence, arbitration, and construction contract dispute mitigation."
  },
  {
    title: "23rd World Congress Selection (Sydney, Australia)",
    year: "2023",
    awardingBody: "World Congress on Safety and Health at Work",
    category: "individual",
    description: "Selected from over 1,100 global submissions to present groundbreaking research on Health & Safety Practices in Construction SMEs.",
    notes: "High-visibility international spotlight highlighting Nigerian safety research on the world stage."
  },
  {
    title: "Corporate HSE Leadership Award (Julius Berger Nigeria PLC)",
    year: "2025",
    awardingBody: "Abuja Safety Summit / Institute of Safety Professionals of Nigeria (ISPON)",
    category: "institutional_recognition",
    description: "Corporate award conferred upon Julius Berger Nigeria PLC recognizing its benchmark implementation of ISO 45001 and ISO 14001 under its HSE leadership.",
    notes: "Reported by The Guardian and Forefront; Osazee attended the summit as Fellow of ISPON while leading Julius Berger's HSE operations."
  },
  {
    title: "Exemplary Site Safety Recognition (Central Bank of Nigeria HQ Site)",
    year: "December 2000",
    awardingBody: "National Safety Advisory Committee",
    category: "team_corporate",
    description: "Site safety recognition conferred upon the Safety Section of Julius Berger Nigeria PLC for exceptional safety performance during the construction of the Central Bank of Nigeria Headquarters in Abuja.",
    notes: "Historic cornerstone in the development of Abuja's modern safety protocols."
  }
];

export const EXECUTIVE_PILLARS = {
  headline: "Executive Pillars: Uniting Scientific Rigor with Mega-Infrastructure Execution",
  pillars: [
    {
      title: "Dual-Master Academic Rigor & Infrastructure Scale",
      description: "Engr. Osazee has directed HSE on Nigeria's largest civil engineering megaprojects at Julius Berger PLC while publishing peer-reviewed environmental research in recognized international journals."
    },
    {
      title: "Interactive Field Engineering Intelligence",
      description: "Grounded in empirical science, including site hazard protocols and rigorous thermal risk management frameworks derived directly from Engr. Osazee's published research."
    },
    {
      title: "Verified Statutory Governance & National Reform",
      description: "Includes official records of statutory legislative mediation (House of Representatives ISPON committee), international IOSH peer review panel appointments, and global conference contributions."
    },
    {
      title: "Scalable Systems & High-Performance Delivery",
      description: "ISO 45001 certified auditing protocols, robust safety metrics, and human-centered operational excellence."
    }
  ]
};
