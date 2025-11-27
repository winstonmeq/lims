import type { Councilor, Committee, Ordinance, User } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const councilors: Councilor[] = [
  { id: 'c1', name: 'Evelyn Reed', district: 'District 1', avatarUrl: findImage('councilor-1'), party: 'Democrat' },
  { id: 'c2', name: 'Marcus Thorne', district: 'District 2', avatarUrl: findImage('councilor-2'), party: 'Republican' },
  { id: 'c3', name: 'Isabella Chen', district: 'District 3', avatarUrl: findImage('councilor-3'), party: 'Independent' },
  { id: 'c4', name: 'David Rodriguez', district: 'District 4', avatarUrl: findImage('councilor-4'), party: 'Democrat' },
  { id: 'c5', name: 'Sarah Jenkins', district: 'District 5', avatarUrl: findImage('councilor-5'), party: 'Republican' },
  { id: 'c6', name: 'Ben Carter', district: 'District 6', avatarUrl: findImage('councilor-6'), party: 'Democrat' },
];

export const committees: Committee[] = [
  { id: 'com1', name: 'Finance and Budget Committee', chairId: 'c1', memberIds: ['c1', 'c2', 'c3'] },
  { id: 'com2', name: 'Public Safety Committee', chairId: 'c4', memberIds: ['c4', 'c5', 'c6'] },
  { id: 'com3', name: 'Zoning and Planning Committee', chairId: 'c2', memberIds: ['c2', 'c3', 'c5'] },
];

export const users: User[] = [
  { id: 'u1', name: 'Alice (Clerk)', email: 'clerk@legislate.now', avatarUrl: findImage('user-clerk'), role: 'clerk' },
  { id: 'u2', name: 'Bob (Secretary)', email: 'secretary@legislate.now', avatarUrl: findImage('user-secretary'), role: 'secretary_admin' },
];

