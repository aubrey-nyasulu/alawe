
import { Metadata } from 'next';
import { redirect } from 'next/navigation'

import LoginForm from '@/ui/dashboard/components/login-form';
import useServerSession from '@/customHooks/useServerSession';
import Link from 'next/link';
import { Button } from '@/tremorComponents/Button';
import Autofiller from './components/Autofiller';

export const metadata: Metadata = {
  title: 'Login',
}

export default async function LoginPage() {
  const { session } = await useServerSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <>
      <header className='langingpage-container px-4 lg:px-0 mx-auto overflow-hidden'>
        <nav className='flex items-center justify-between mt-8'>
          <p
            className='text-primary font-semibold text-xl '
          >
            Login
          </p>


          <a
            href={"/"}
          >
            <Button variant='secondary' className='bg-transparent md:p-4 w-fit h-fit hover:bg-primary hover:text-white  rounded-full  ' >
              Back To Home
            </Button>
          </a>
        </nav>

      </header>

      <main className="relative mx-auto flex flex-col w-full max-w-[400px] items-center justify-center h-[80vh] pace-y-2.5 p-4">
        <LoginForm />

        <Autofiller />
      </main>

    </>
  );
}