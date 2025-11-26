export type UserRole = 'clerk' | 'committee_member' | 'secretary_admin' | 'auditor' | 'public';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
};

export type Councilor = {
  id: string;
  name: string;
  district: string;
  avatarUrl: string;
  party: 'Democrat' | 'Republican' | 'Independent';
};

export type Committee = {
  id: string;
  name: string;
  chairId: string;
  memberIds: string[];
};

export type VoteValue = 'Aye' | 'Nay' | 'Abstain' | 'Absent';

export type Vote = {
  councilorId: string;
  vote: VoteValue;
};
export type OrdinanceStatus = 'Introduced' | 'In Committee' | 'First Reading' | 'Passed' | 'Rejected';

export type DocumentVersion = {
  version: number;
  date: string;
  description: string;
  url: string;
};

export type Ordinance = {
  _id: string;
  title: string;
  billNumber: string;
  description: string;
  status: OrdinanceStatus;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

// Resolutions are structurally similar to Ordinances
export type Resolution = Ordinance;
