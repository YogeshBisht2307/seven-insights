import { Session, SupabaseClient } from "@supabase/supabase-js";

export interface TopBarProps {
    isNavOpen: boolean,
    setIsNavOpen: (isNavOpen: boolean) => void;
    session: Session | null,
    supabase: SupabaseClient
}

export interface ProfileMenuProps {
    supabase: SupabaseClient
}