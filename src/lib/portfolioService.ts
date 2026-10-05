import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from './firebase';
import { Credential, InquiryMessage, BookItem } from '../types';
import { Megaproject, SIGNATURE_WORKS } from '../data/projectsData';
import { CREDENTIALS } from '../data/profileData';
import { BOOKS_AND_PUBLICATIONS } from '../data/booksData';

const CREDENTIALS_COLLECTION = 'credentials';
const PROJECTS_COLLECTION = 'projects';
const INQUIRIES_COLLECTION = 'inquiries';
const BOOKS_COLLECTION = 'books';

// Local Storage Cache Keys
const LOCAL_CREDS_KEY = 'hse_cached_credentials_v2';
const LOCAL_PROJECTS_KEY = 'hse_cached_projects_v2';
const LOCAL_BOOKS_KEY = 'hse_cached_books_v2';
const LOCAL_INQUIRIES_KEY = 'hse_cached_inquiries_v2';
const INQUIRY_STATUS_OVERRIDES_KEY = 'hse_inquiry_status_overrides';
const DELETED_INQUIRIES_KEY = 'hse_deleted_inquiry_ids_v2';

// Known sample query IDs to purge permanently
const SAMPLE_INQUIRY_IDS = new Set(['inq-01', 'inq-02', 'inq-03', 'inq-04']);

// DEFAULT_INQUIRIES is strictly empty so ONLY real user-inputted queries appear on dashboard
export const DEFAULT_INQUIRIES: InquiryMessage[] = [];

export function getDeletedInquiryIds(): Set<string> {
  try {
    const raw = localStorage.getItem(DELETED_INQUIRIES_KEY);
    if (!raw) return new Set<string>();
    const parsed = JSON.parse(raw);
    return new Set<string>(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set<string>();
  }
}

export function saveDeletedInquiryIds(set: Set<string>) {
  try {
    localStorage.setItem(DELETED_INQUIRIES_KEY, JSON.stringify(Array.from(set)));
  } catch (err) {
    console.warn('Error saving deleted inquiry IDs:', err);
  }
}

export function getRawLocalInquiries(): InquiryMessage[] {
  try {
    const raw = localStorage.getItem(LOCAL_INQUIRIES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const deletedIds = getDeletedInquiryIds();
    return parsed.filter(item => 
      item && 
      typeof item === 'object' && 
      typeof item.id === 'string' &&
      !SAMPLE_INQUIRY_IDS.has(item.id) &&
      !deletedIds.has(item.id) &&
      (item.name || item.email || item.message)
    );
  } catch {
    return [];
  }
}

export function saveInquiryStatusOverride(id: string, status: 'new' | 'reviewed' | 'archived') {
  try {
    const raw = localStorage.getItem(INQUIRY_STATUS_OVERRIDES_KEY);
    const overrides: Record<string, string> = raw ? JSON.parse(raw) : {};
    overrides[id] = status;
    localStorage.setItem(INQUIRY_STATUS_OVERRIDES_KEY, JSON.stringify(overrides));
  } catch (err) {
    console.warn('Error saving inquiry status override:', err);
  }
}

export function applyInquiryStatusOverrides(items: InquiryMessage[]): InquiryMessage[] {
  try {
    const raw = localStorage.getItem(INQUIRY_STATUS_OVERRIDES_KEY);
    if (!raw) return items;
    const overrides: Record<string, 'new' | 'reviewed' | 'archived'> = JSON.parse(raw);
    return items.map(item => {
      if (overrides[item.id]) {
        return { ...item, status: overrides[item.id] };
      }
      return item;
    });
  } catch {
    return items;
  }
}

/**
 * Merges baseline items with any new items or updates by ID,
 * ensuring all original credentials and data are ALWAYS preserved!
 */
function mergeWithBaseline<T extends { id: string }>(baseline: T[], incoming: T[]): T[] {
  const map = new Map<string, T>();
  // 1. Put all valid baseline items in map
  (baseline || []).filter(item => item && typeof item === 'object' && typeof item.id === 'string').forEach(item => map.set(item.id, item));
  // 2. Put / overwrite with valid incoming items
  if (Array.isArray(incoming)) {
    incoming.filter(item => item && typeof item === 'object' && typeof item.id === 'string').forEach(item => map.set(item.id, item));
  }
  return Array.from(map.values());
}

function getLocal<T extends { id: string }>(key: string, baseline: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return baseline;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const validItems = parsed.filter(item => item && typeof item === 'object' && typeof item.id === 'string');
      return mergeWithBaseline(baseline, validItems);
    }
    return baseline;
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage, resetting:`, err);
    try {
      localStorage.removeItem(key);
    } catch {}
    return baseline;
  }
}

function setLocal<T>(key: string, data: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Failed writing to ${key}:`, err);
  }
}

// Event bus to notify components of immediate state updates
const LIVE_UPDATE_EVENT = 'hse-live-portfolio-update';
function notifyLiveUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(LIVE_UPDATE_EVENT));
  }
}

/**
 * Seed initial portfolio items from static catalog into Firestore
 * if the collections have not been initialized yet.
 */
export async function seedInitialDataIfEmpty(): Promise<void> {
  try {
    const credSnap = await getDocs(collection(db, CREDENTIALS_COLLECTION));
    if (credSnap.empty) {
      for (const cred of CREDENTIALS) {
        await setDoc(doc(db, CREDENTIALS_COLLECTION, cred.id), {
          ...cred,
          updatedAt: new Date().toISOString()
        });
      }
      // Initialize aggregate manifest document with array of credentials
      const manifestRef = doc(db, CREDENTIALS_COLLECTION, 'manifest');
      await setDoc(manifestRef, {
        credentials: CREDENTIALS,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } else {
      // Ensure manifest doc exists even if collection was already populated
      const manifestRef = doc(db, CREDENTIALS_COLLECTION, 'manifest');
      const mSnap = await getDoc(manifestRef);
      if (!mSnap.exists()) {
        await setDoc(manifestRef, {
          credentials: CREDENTIALS,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
    }

    const projSnap = await getDocs(collection(db, PROJECTS_COLLECTION));
    if (projSnap.empty) {
      for (const proj of SIGNATURE_WORKS) {
        await setDoc(doc(db, PROJECTS_COLLECTION, proj.id), {
          ...proj,
          updatedAt: new Date().toISOString()
        });
      }
    }

    const bookSnap = await getDocs(collection(db, BOOKS_COLLECTION));
    if (bookSnap.empty) {
      for (const book of BOOKS_AND_PUBLICATIONS) {
        await setDoc(doc(db, BOOKS_COLLECTION, book.id), {
          ...book,
          updatedAt: new Date().toISOString()
        });
      }
    }
  } catch (err) {
    console.warn('Initial Firestore seed notice:', err);
  }
}

// ---------------- Real-time Listeners ---------------- //

export function subscribeToCredentials(
  onUpdate: (credentials: Credential[]) => void,
  onError?: (error: Error) => void
) {
  // Always emit combined baseline + custom credentials immediately
  const initial = getLocal<Credential>(LOCAL_CREDS_KEY, CREDENTIALS);
  onUpdate(initial);

  const handleLocalChange = () => {
    const updated = getLocal<Credential>(LOCAL_CREDS_KEY, CREDENTIALS);
    onUpdate(updated);
  };
  if (typeof window !== 'undefined') {
    window.addEventListener(LIVE_UPDATE_EVENT, handleLocalChange);
  }

  // Also listen to Firestore live sync, merging with baseline so nothing ever gets deleted!
  let unsubscribeFirestore = () => {};
  try {
    const q = collection(db, CREDENTIALS_COLLECTION);
    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const items: Credential[] = [];
          snapshot.docs.forEach((d) => {
            if (d.id === 'manifest') {
              const data = d.data();
              const arrayItems = (data.credentials || data.items || []) as Credential[];
              if (Array.isArray(arrayItems)) {
                items.push(...arrayItems.filter(x => x && typeof x === 'object' && typeof x.id === 'string' && x.title));
              }
            } else {
              const data = d.data();
              if (data && typeof data === 'object' && (data.title || data.designation)) {
                items.push({
                  id: d.id,
                  ...data
                } as Credential);
              }
            }
          });
          const currentLocal = getLocal<Credential>(LOCAL_CREDS_KEY, CREDENTIALS);
          const merged = mergeWithBaseline(CREDENTIALS, [...currentLocal, ...items]);
          setLocal(LOCAL_CREDS_KEY, merged);
          onUpdate(merged);
        }
      },
      (err) => {
        console.warn('Credentials Firestore listener using local cached dataset:', err);
        if (onError) onError(err);
      }
    );
  } catch (err: any) {
    console.warn('Firestore snapshot setup skipped:', err);
  }

  return () => {
    unsubscribeFirestore();
    if (typeof window !== 'undefined') {
      window.removeEventListener(LIVE_UPDATE_EVENT, handleLocalChange);
    }
  };
}

export function subscribeToProjects(
  onUpdate: (projects: Megaproject[]) => void,
  onError?: (error: Error) => void
) {
  const initial = getLocal<Megaproject>(LOCAL_PROJECTS_KEY, SIGNATURE_WORKS);
  onUpdate(initial);

  const handleLocalChange = () => {
    const updated = getLocal<Megaproject>(LOCAL_PROJECTS_KEY, SIGNATURE_WORKS);
    onUpdate(updated);
  };
  if (typeof window !== 'undefined') {
    window.addEventListener(LIVE_UPDATE_EVENT, handleLocalChange);
  }

  let unsubscribeFirestore = () => {};
  try {
    const q = collection(db, PROJECTS_COLLECTION);
    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((p: any) => p && typeof p === 'object' && typeof p.id === 'string' && p.title) as Megaproject[];
          const currentLocal = getLocal<Megaproject>(LOCAL_PROJECTS_KEY, SIGNATURE_WORKS);
          const merged = mergeWithBaseline(SIGNATURE_WORKS, [...currentLocal, ...items]);
          setLocal(LOCAL_PROJECTS_KEY, merged);
          onUpdate(merged);
        }
      },
      (err) => {
        console.warn('Projects Firestore listener using local cached dataset:', err);
        if (onError) onError(err);
      }
    );
  } catch (err: any) {
    console.warn('Firestore snapshot setup skipped:', err);
  }

  return () => {
    unsubscribeFirestore();
    if (typeof window !== 'undefined') {
      window.removeEventListener(LIVE_UPDATE_EVENT, handleLocalChange);
    }
  };
}

export function subscribeToInquiries(
  onUpdate: (inquiries: InquiryMessage[]) => void,
  onError?: (error: Error) => void
) {
  const getProcessedInquiries = (rawItems: InquiryMessage[]): InquiryMessage[] => {
    const deletedIds = getDeletedInquiryIds();
    const clean = rawItems
      .filter((i: any) => i && typeof i === 'object' && typeof i.id === 'string')
      .filter((i: any) => !SAMPLE_INQUIRY_IDS.has(i.id))
      .filter((i: any) => !deletedIds.has(i.id))
      .filter((i: any) => (i.name || i.email || i.message)) as InquiryMessage[];
    
    const withOverrides = applyInquiryStatusOverrides(clean);
    // Sort descending by date/createdAt
    withOverrides.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });
    return withOverrides;
  };

  const initial = getProcessedInquiries(getRawLocalInquiries());
  onUpdate(initial);

  const handleLocalChange = () => {
    const updated = getProcessedInquiries(getRawLocalInquiries());
    onUpdate(updated);
  };
  if (typeof window !== 'undefined') {
    window.addEventListener(LIVE_UPDATE_EVENT, handleLocalChange);
  }

  let unsubscribeFirestore = () => {};
  try {
    const q = collection(db, INQUIRIES_COLLECTION);
    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        const deletedIds = getDeletedInquiryIds();
        const firestoreItems = snapshot.docs
          .map((d) => ({ ...d.data(), id: d.id }))
          .filter((i: any) => i && typeof i === 'object' && typeof i.id === 'string' && (i.name || i.email || i.message)) as InquiryMessage[];
        
        // Merge with local inquiries by ID (no sample queries, respecting deleted IDs)
        const currentLocal = getRawLocalInquiries();
        const map = new Map<string, InquiryMessage>();
        
        // 1. Add valid incoming items from Firestore
        firestoreItems.forEach(item => {
          if (!SAMPLE_INQUIRY_IDS.has(item.id) && !deletedIds.has(item.id)) {
            map.set(item.id, item);
          }
        });

        // 2. Also keep any newly created local items that haven't synced yet
        currentLocal.forEach(item => {
          if (!SAMPLE_INQUIRY_IDS.has(item.id) && !deletedIds.has(item.id)) {
            if (!map.has(item.id)) {
              map.set(item.id, item);
            }
          }
        });

        const merged = Array.from(map.values());
        const finalInquiries = getProcessedInquiries(merged);
        try {
          localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(finalInquiries));
        } catch {}
        onUpdate(finalInquiries);
      },
      (err) => {
        console.warn('Inquiries Firestore listener using local cache:', err);
        if (onError) onError(err);
      }
    );
  } catch (err: any) {
    console.warn('Firestore snapshot setup skipped:', err);
  }

  return () => {
    unsubscribeFirestore();
    if (typeof window !== 'undefined') {
      window.removeEventListener(LIVE_UPDATE_EVENT, handleLocalChange);
    }
  };
}

export function subscribeToBooks(
  onUpdate: (books: BookItem[]) => void,
  onError?: (error: Error) => void
) {
  const initial = getLocal<BookItem>(LOCAL_BOOKS_KEY, BOOKS_AND_PUBLICATIONS);
  onUpdate(initial);

  const handleLocalChange = () => {
    const updated = getLocal<BookItem>(LOCAL_BOOKS_KEY, BOOKS_AND_PUBLICATIONS);
    onUpdate(updated);
  };
  if (typeof window !== 'undefined') {
    window.addEventListener(LIVE_UPDATE_EVENT, handleLocalChange);
  }

  let unsubscribeFirestore = () => {};
  try {
    const q = collection(db, BOOKS_COLLECTION);
    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((b: any) => b && typeof b === 'object' && typeof b.id === 'string' && b.title) as BookItem[];
          const currentLocal = getLocal<BookItem>(LOCAL_BOOKS_KEY, BOOKS_AND_PUBLICATIONS);
          const merged = mergeWithBaseline(BOOKS_AND_PUBLICATIONS, [...currentLocal, ...items]);
          setLocal(LOCAL_BOOKS_KEY, merged);
          onUpdate(merged);
        }
      },
      (err) => {
        console.warn('Books Firestore listener using local cached dataset:', err);
        if (onError) onError(err);
      }
    );
  } catch (err: any) {
    console.warn('Firestore snapshot setup skipped:', err);
  }

  return () => {
    unsubscribeFirestore();
    if (typeof window !== 'undefined') {
      window.removeEventListener(LIVE_UPDATE_EVENT, handleLocalChange);
    }
  };
}

// ---------------- CRUD Operations: Credentials ---------------- //

export async function addCredentialItem(cred: Omit<Credential, 'id'> & { id?: string }): Promise<string> {
  const credId = cred.id || `cred-${Date.now()}`;
  const newItem: Credential = {
    ...cred,
    id: credId
  };

  // 1. Merge into local credentials list so old ones are ALWAYS retained immediately!
  const current = getLocal<Credential>(LOCAL_CREDS_KEY, CREDENTIALS);
  const updated = [newItem, ...current.filter(c => c.id !== credId)];
  setLocal(LOCAL_CREDS_KEY, updated);
  notifyLiveUpdate();

  // 2. Synchronize to Firestore: Use arrayUnion to append into existing credentials document without overwriting!
  try {
    const manifestRef = doc(db, CREDENTIALS_COLLECTION, 'manifest');
    await setDoc(manifestRef, {
      credentials: arrayUnion(newItem),
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore arrayUnion append error:', err);
  }

  // 3. Also write individual document with merge: true for backwards compatibility
  try {
    const docRef = doc(db, CREDENTIALS_COLLECTION, credId);
    await setDoc(docRef, {
      ...newItem,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore addCredentialItem sync notice:', err);
  }

  return credId;
}

export async function updateCredentialItem(id: string, updates: Partial<Credential>): Promise<void> {
  const current = getLocal<Credential>(LOCAL_CREDS_KEY, CREDENTIALS);
  const oldItem = current.find(c => c.id === id);
  const updated = current.map(c => c.id === id ? { ...c, ...updates } : c);
  const newItem = updated.find(c => c.id === id);
  setLocal(LOCAL_CREDS_KEY, updated);
  notifyLiveUpdate();

  try {
    const manifestRef = doc(db, CREDENTIALS_COLLECTION, 'manifest');
    if (oldItem && newItem) {
      await updateDoc(manifestRef, {
        credentials: arrayRemove(oldItem)
      }).catch(() => {});
      await setDoc(manifestRef, {
        credentials: arrayUnion(newItem),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } else {
      await setDoc(manifestRef, {
        credentials: updated,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }
  } catch (err) {
    console.warn('Firestore updateCredentialItem manifest notice:', err);
  }

  try {
    const docRef = doc(db, CREDENTIALS_COLLECTION, id);
    await setDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore updateCredentialItem sync notice:', err);
  }
}

export async function deleteCredentialItem(id: string): Promise<void> {
  const current = getLocal<Credential>(LOCAL_CREDS_KEY, CREDENTIALS);
  const target = current.find(c => c.id === id);
  const updated = current.filter(c => c.id !== id);
  setLocal(LOCAL_CREDS_KEY, updated);
  notifyLiveUpdate();

  try {
    const manifestRef = doc(db, CREDENTIALS_COLLECTION, 'manifest');
    if (target) {
      await updateDoc(manifestRef, {
        credentials: arrayRemove(target)
      }).catch(async () => {
        await setDoc(manifestRef, { credentials: updated, updatedAt: new Date().toISOString() }, { merge: true });
      });
    }
    const docRef = doc(db, CREDENTIALS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore deleteCredentialItem sync notice:', err);
  }
}

// ---------------- CRUD Operations: Projects ---------------- //

export async function addProjectItem(proj: Omit<Megaproject, 'id'> & { id?: string }): Promise<string> {
  const projId = proj.id || `proj-${Date.now()}`;
  const newItem: Megaproject = {
    ...proj,
    id: projId
  };

  const current = getLocal<Megaproject>(LOCAL_PROJECTS_KEY, SIGNATURE_WORKS);
  const updated = [newItem, ...current.filter(p => p.id !== projId)];
  setLocal(LOCAL_PROJECTS_KEY, updated);
  notifyLiveUpdate();

  try {
    const docRef = doc(db, PROJECTS_COLLECTION, projId);
    await setDoc(docRef, {
      ...newItem,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Firestore addProjectItem sync notice:', err);
  }

  return projId;
}

export async function updateProjectItem(id: string, updates: Partial<Megaproject>): Promise<void> {
  const current = getLocal<Megaproject>(LOCAL_PROJECTS_KEY, SIGNATURE_WORKS);
  const updated = current.map(p => p.id === id ? { ...p, ...updates } : p);
  setLocal(LOCAL_PROJECTS_KEY, updated);
  notifyLiveUpdate();

  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await setDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore updateProjectItem sync notice:', err);
  }
}

export async function deleteProjectItem(id: string): Promise<void> {
  const current = getLocal<Megaproject>(LOCAL_PROJECTS_KEY, SIGNATURE_WORKS);
  const updated = current.filter(p => p.id !== id);
  setLocal(LOCAL_PROJECTS_KEY, updated);
  notifyLiveUpdate();

  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore deleteProjectItem sync notice:', err);
  }
}

// ---------------- CRUD Operations: Inquiries ---------------- //

export async function submitInquiryToFirestore(inquiry: Omit<InquiryMessage, 'id'>): Promise<string> {
  const id = `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const newMsg: InquiryMessage = {
    ...inquiry,
    id,
    createdAt: new Date().toISOString()
  };

  const current = getRawLocalInquiries();
  const updated = [newMsg, ...current.filter(i => i.id !== id)];
  try {
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(updated));
  } catch {}
  notifyLiveUpdate();

  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    await setDoc(docRef, newMsg, { merge: true });
  } catch (err) {
    console.warn('Firestore submitInquiry sync notice:', err);
  }

  return id;
}

export async function updateInquiryStatus(id: string, status: 'new' | 'reviewed' | 'archived'): Promise<void> {
  // 1. Permanently record override in localStorage so refreshes always retain this status
  saveInquiryStatusOverride(id, status);

  // 2. Update local inquiries cache immediately
  const current = getRawLocalInquiries();
  const updated = current.map(i => i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i);
  try {
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(updated));
  } catch {}
  notifyLiveUpdate();

  // 3. Persist change to Firestore database
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    await setDoc(docRef, { status, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn('Firestore updateInquiryStatus sync notice:', err);
  }
}

export async function deleteInquiryItem(id: string): Promise<void> {
  // 1. Add to permanent deleted list so it will never resurrect
  const deletedSet = getDeletedInquiryIds();
  deletedSet.add(id);
  saveDeletedInquiryIds(deletedSet);

  // 2. Clean out status override
  try {
    const raw = localStorage.getItem(INQUIRY_STATUS_OVERRIDES_KEY);
    if (raw) {
      const overrides = JSON.parse(raw);
      delete overrides[id];
      localStorage.setItem(INQUIRY_STATUS_OVERRIDES_KEY, JSON.stringify(overrides));
    }
  } catch {}

  // 3. Filter out from local inquiries cache
  const current = getRawLocalInquiries();
  const updated = current.filter(i => i.id !== id);
  try {
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(updated));
  } catch {}
  notifyLiveUpdate();

  // 4. Delete document directly from Firestore database
  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore deleteInquiryItem sync notice:', err);
  }
}

// ---------------- CRUD Operations: Books ---------------- //

export async function addBookItem(book: Omit<BookItem, 'id'> & { id?: string }): Promise<string> {
  const bookId = book.id || `book-${Date.now()}`;
  const newItem: BookItem = {
    ...book,
    id: bookId
  };

  const current = getLocal<BookItem>(LOCAL_BOOKS_KEY, BOOKS_AND_PUBLICATIONS);
  const updated = [newItem, ...current.filter(b => b.id !== bookId)];
  setLocal(LOCAL_BOOKS_KEY, updated);
  notifyLiveUpdate();

  try {
    const docRef = doc(db, BOOKS_COLLECTION, bookId);
    await setDoc(docRef, {
      ...newItem,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Firestore addBookItem sync notice:', err);
  }

  return bookId;
}

export async function updateBookItem(id: string, updates: Partial<BookItem>): Promise<void> {
  const current = getLocal<BookItem>(LOCAL_BOOKS_KEY, BOOKS_AND_PUBLICATIONS);
  const updated = current.map(b => b.id === id ? { ...b, ...updates } : b);
  setLocal(LOCAL_BOOKS_KEY, updated);
  notifyLiveUpdate();

  try {
    const docRef = doc(db, BOOKS_COLLECTION, id);
    await setDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore updateBookItem sync notice:', err);
  }
}

export async function deleteBookItem(id: string): Promise<void> {
  const current = getLocal<BookItem>(LOCAL_BOOKS_KEY, BOOKS_AND_PUBLICATIONS);
  const updated = current.filter(b => b.id !== id);
  setLocal(LOCAL_BOOKS_KEY, updated);
  notifyLiveUpdate();

  try {
    const docRef = doc(db, BOOKS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore deleteBookItem sync notice:', err);
  }
}
