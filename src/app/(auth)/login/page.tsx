import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import LoginForm from './login-form';
import { redirect } from 'next/navigation';


export const dynamic = 'force-dynamic'


export default async function Login() {
    const supabase = createServerComponentClient({cookies});
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        redirect("/admin/dashboard");
    }

    return (
        <div className="max-w-10xl h-screen sm:pt-32">
            <div className="w-full max-w-xs p-4 border rounded-lg shadow-sm sm:p-6 md:p-8 mx-auto">
                <div className="w-3xl mx-auto">
                    <h1 className="text-xl mb-8 font-bold">Sign In with Credentials</h1>
                </div>
                <div className="">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}