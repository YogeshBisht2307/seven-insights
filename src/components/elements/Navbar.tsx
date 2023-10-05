import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/elements/ModeToggle";

const Navbar = async () => {
    return (
        <header>
            <nav className={`fixed top-0 z-50 w-full bg-background`}>
                <div className="px-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <Link href="/" className="flex ml-2 md:mr-24">
                                <div>
                                    <Image src="/seven-insights.png" priority width={100} height={50} className="sm:ml-12" alt="Seven Insights" />
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar