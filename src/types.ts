export type AppType = 'app' | 'system' | 'website';

export const APP_TYPES = ['app', 'system', 'website'] as const;

export interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
  ADMIN_TOKEN: string;
}

export interface AppRecord {
  id: string;
  type: AppType;
  name: string;
  description: string;
  image_key: string | null;
  link: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}
