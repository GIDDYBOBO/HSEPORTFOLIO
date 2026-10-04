export type PageId = 'home' | 'about' | 'books' | 'contact' | 'overview' | 'works' | 'services' | 'publications' | 'leadership' | 'advisory';

export interface Credential {
  id: string;
  title: string;
  designation: string;
  issuer: string;
  year?: string;
  credentialId?: string;
  description: string;
  highlight?: boolean;
  verificationStatus?: 'Verified' | 'Chartered' | 'Active Fellow' | 'Lead Auditor';
  verificationUrl?: string;
}

export interface BookItem {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  coverGradient: string;
  accentColor: string;
  badge: string;
  publishedYear: string;
  publisherOrJournal: string;
  doiOrRef?: string;
  pagesOrLength: string;
  abstract: string;
  whatYoullLearn: string[];
  whoIsThisFor: string[];
  keyTopics: string[];
  authorsNote: string;
  accessUrl?: string;
  citation: string;
  format: 'Technical Monograph' | 'Peer-Reviewed Paper' | 'Guidance Standard' | 'Congress Paper';
  imageUrl?: string;
  imageAlt?: string;
}

export type InquirySegment = 
  | 'hse_consultation' 
  | 'speaking_training' 
  | 'book_enquiry' 
  | 'iso_audit' 
  | 'professional_opportunity' 
  | 'general_enquiry'
  | string;

export interface InquiryMessage {
  id: string;
  date: string;
  name: string;
  organization: string;
  email: string;
  phone?: string;
  segment: InquirySegment;
  timeframe: string;
  message: string;
  status: 'new' | 'reviewed' | 'archived';
  createdAt?: string;
}

export interface SiteProfileData {
  fullName: string;
  primaryTitle: string;
  organization: string;
  location: string;
  statement: string;
  bioOverview: string;
  email: string;
  phone: string;
  yearsExperience: string;
  totalAudits: string;
  projectsSupervised: string;
  availabilityStatus: string;
}

export interface CareerMilestone {
  period: string;
  role: string;
  organization: string;
  location: string;
  highlights: string[];
  scope: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
  publishedDate: string;
  doi?: string;
  url?: string;
  abstract: string;
  keyThemes: string[];
  keyFindings: string[];
  citation: string;
  type: 'journal' | 'technical_paper' | 'world_congress' | 'national_guidance';
}

export interface LeadershipRole {
  period: string;
  role: string;
  organization: string;
  details: string;
  category: 'governance' | 'institutional' | 'speaking';
  impactSummary: string;
}

export interface AwardItem {
  title: string;
  year: string;
  awardingBody: string;
  category: 'individual' | 'institutional_recognition' | 'team_corporate';
  description: string;
  notes?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
  badge?: string;
  verified?: boolean;
}
