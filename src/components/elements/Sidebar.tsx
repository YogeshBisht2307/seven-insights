"use client";

import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Session } from "@supabase/supabase-js";

import { sideMenu } from "@/constants/navigation";
import TopBar from "@/components/elements/TopBar";


const Sidebar = () => {
    const supabase = createClientComponentClient();

    const pathname = usePathname();
    const [ isNavOpen, setIsNavOpen ] = useState(false);
    const [ session, setSession ] = useState<Session | null>(null);


    useEffect(() => {
        (async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        })();
    }, [supabase.auth]);

    return (
        <>
            <TopBar session={session} isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} supabase={supabase} />
            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-background text-foreground transition-transform border-r border-secondary ${isNavOpen ? "-translate-x-full" : "sm:translate-x-0"}`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        {sideMenu.map((menu) => (
                            <li 
                                key={menu.link}
                            >
                                <Link href={menu.link} className={`${pathname.startsWith(menu.link) ? "bg-primary text-primary-foreground" : ""} flex items-center p-2 rounded-lg hover:bg-primary hover:text-primary-foreground group`}>
                                    {menu.icon}
                                    <span className="ml-3">{menu.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;