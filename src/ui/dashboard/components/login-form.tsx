'use client';

import { useContext, useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/tremorComponents/Button'
import { cx } from '@/lib/utils';
import StoreContext from '@/context/StoreStateProvider';
// import { authenticate } from '@/actions/invoiceActions';

export default function LoginForm() {
  const { autoFillData } = useContext(StoreContext)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // const router = useRouter()

  useEffect(() => {
    setEmail(autoFillData.email)

    setPassword(autoFillData.password)
  }, [autoFillData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    // Call NextAuth signIn method with credentials
    const res = await signIn('credentials', {
      redirect: false, // Prevent auto-redirect
      email,
      password
    })

    console.log('\n\n\n\n', res, '\n\n\n\n')

    if (res?.error) {
      if (res.status !== 401) {
        setError('The servers did not respond in time, please make sure you are connected to the internet')
      } else {
        setError('Invalid email or password')
      }

      setIsSubmitting(false)
    } else {
      // Redirect on successful login
      // router.push('/dashboard')
      setIsSubmitting(false)
      window.location.href = '/dashboard'
    }
  }

  return (
    <>
      {error && <p style={{ color: 'red' }} className='mb-4 text-center'> {error} </p>
      }
      <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6' >
        <input
          type="email"
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='px-6 h-[60px] border border-[#e0e0e0] w-full rounded-md'
        />
        < div className='w-full mb-4' >
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='px-6 h-[60px] border border-[#e0e0e0] w-full rounded-md'
          />
        </div>
        <LoginButton {...{ isSubmitting }} />
      </form>
    </>
  )
}

function LoginButton({ isSubmitting }: { isSubmitting: boolean }) {

  return (
    <Button
      className={cx("p-4 bg-primary text-white rounded-full")}
      aria-disabled={isSubmitting}
      disabled={isSubmitting}
      isLoading={isSubmitting}
      loadingText='Verifying...'
    >
      Log in
    </Button>
  );
}
