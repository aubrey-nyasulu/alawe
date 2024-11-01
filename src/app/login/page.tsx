
import { Metadata } from 'next';
import { redirect } from 'next/navigation'

import LoginForm from '@/ui/dashboard/components/login-form';
import useServerSession from '@/customHooks/useServerSession';
import Link from 'next/link';
import { Button } from '@/tremorComponents/Button';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function LoginPage() {
  const { session } = await useServerSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <>
      <header className='langingpage-container px-4 lg:px-0 mx-auto overflow-hidden'>

        <nav className='flex items-center justify-between mt-8'>
          <Link
            href={"/"}
            className='text-primary font-semibold text-xl '
          >
            Login
          </Link>


          <Link
            href="/"
          >
            <Button variant='secondary' className='bg-transparent md:p-4 w-fit h-fit hover:bg-primary hover:text-white  ' >
              Back To Home
            </Button>
          </Link>
        </nav>

      </header>
      <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
          <LoginForm />
        </div>
      </main>
    </>
  );
}