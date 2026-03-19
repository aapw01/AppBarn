export interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
  ADMIN_TOKEN: string;
}

export interface AppRecord {
  id: string;
  type: 'app' | 'system';
  name: string;
  description: string;
  image_key: string | null;
  link: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}
