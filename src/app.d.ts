import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			session: Session | null;
		}

		interface PageData {
			session: Session | null;
		}

		interface Error {
			code: number;
			message: string;
		}
	}
}

export {};
