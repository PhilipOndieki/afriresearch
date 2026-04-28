export type EnquiryStatus = 'NEW' | 'READ' | 'REPLIED' | 'CLOSED';

export type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  serviceInterest: string | null;
  message: string;
  attachmentUrl: string | null;
  status: EnquiryStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};
