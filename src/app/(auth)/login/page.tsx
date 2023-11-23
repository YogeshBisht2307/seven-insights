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
        <div className="max-w-10xl h-screen flex justify-center items-center">
            <div className="w-full max-w-xs sm:max-w-sm py-12 px-4 sm:py-8 sm:px-8 border rounded-lg shadow-sm mx-auto">
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