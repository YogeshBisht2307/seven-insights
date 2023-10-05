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

export interface PostMinimal{
    id: String,
    title: String,
    slug: String,
    createdAt: Date,
    published: boolean
}

export interface PostTableProps {
    posts: PostMinimal[]
}

export interface UpdatePostStatusType {
    published: boolean
}

export interface UpdatePostApiContext{
    params: UpdatePostStatusApiParams
}

export interface UpdatePostStatusApiParams{
    id: string
}
