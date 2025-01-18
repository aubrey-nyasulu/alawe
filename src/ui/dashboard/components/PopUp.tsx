'use client'

import { Button } from '@/tremorComponents/Button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/tremorComponents/Dialog";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/tremorComponents/Tabs"
import { RiKey2Line, } from '@remixicon/react';
import { CookieIcon } from '@/assets/SVGComponents';
import Link from 'next/link';
import PassIdModel from '@/db/models/PassIdModel';
import { verifyPassId } from '@/actions/authenticateActions';


export const PopUp = () => {
    const [modelOpen, setModelOpen] = useState(true)
    const [currentSection, setCurrentSection] = useState<'cookies' | 'passID'>('cookies')

    useEffect(() => {
        const acceptedCookies = localStorage.getItem('acceptedCookies')

        if (acceptedCookies === 'yes') {
            setModelOpen(false)
        }
    }, [])

    return (
        <>
            <div className="hidden">
                <Dialog open={modelOpen}>
                    <DialogContent className="sm:max-w-lg ">
                        <Tabs defaultValue={''} value={currentSection}>
                            <TabsList variant="line" className="bg-white dark:bg-[#090E1A] shadow-sm  gap-8 sticky top-0 z-40">
                                <TabsTrigger value="cookies"
                                    className="inline-flex gap-1 group outline-none"
                                >
                                    <CookieIcon />
                                </TabsTrigger>

                                <TabsTrigger value="passID" className="inline-flex gap-1 group outline-none">
                                    <RiKey2Line className="size-5 text-inherit" />
                                </TabsTrigger>
                            </TabsList>
                            <div className="pt-4">
                                <TabsContent value="cookies">
                                    <CookiesConsent setCurrentSection={setCurrentSection} />
                                </TabsContent>
                                <TabsContent value="passID">
                                    <PassId setModelOpen={setModelOpen} />
                                </TabsContent>
                            </div>
                        </Tabs>

                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}


function CookiesConsent({ setCurrentSection }: { setCurrentSection: Dispatch<SetStateAction<'cookies' | 'passID'>> }) {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Cookies Consent</DialogTitle>
                <DialogDescription className="mt-1 text-sm leading-6">
                    This website uses cookies to ensure you get the best experience on our site. Cookies are small files that store information on your browser.
                    This information helps us remember your preferences and improve our services.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6">
                {/* <DialogClose asChild> */}
                <Button
                    className="mt-2 w-full sm:mt-0 sm:w-fit rounded-full px-6 py-3 outline-none"
                    variant="secondary"
                    onClick={() => {
                        localStorage.clear()
                        window.history.back()
                    }}
                >
                    Go Back
                </Button>
                {/* </DialogClose> */}
                {/* <DialogClose asChild> */}
                <Button
                    onClick={() => {
                        localStorage.setItem('acceptedCookies', 'yes')
                        setCurrentSection('passID')
                    }}
                    className="w-full sm:w-fit rounded-full px-6 py-3 outline-none"
                >
                    Continue
                </Button>
                {/* </DialogClose> */}
            </DialogFooter>
        </>
    )
}

function PassId({ setModelOpen }: { setModelOpen: Dispatch<SetStateAction<boolean>> }) {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const verifyPassID = async (e: any) => {
        setIsSubmitting(true)
        setError('')

        try {

            if (value.length === 0) {
                setError('No input was passed. Please Skip or enter a valid key in the input to continue')

                setIsSubmitting(false)

                return
            }

            const passIdExists = await verifyPassId(value)

            if (passIdExists.isValid) {
                localStorage.setItem('passID', value)
                setModelOpen(false)
                setIsSubmitting(false)
            } else {
                console.log({ passIdExists })

                setError(passIdExists.message)
                setIsSubmitting(false)
            }
        } catch (error: any) {
            console.log(error?.message)

            setError('Failed to finish verification stage. Please make sure you have an internet connection')

            setIsSubmitting(false)
        }
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Pass ID (optional)</DialogTitle>
                <DialogDescription className="mt-1 text-sm leading-6">
                    To ensure data integrity, only users with a valid pass ID are authorized to perform CREATE, UPDATE, and DELETE actions. Users without a pass ID have read-only privileges. If you require a pass ID and wish to obtain one, please connect with me via <Link href="https://www.linkedin.com/in/aubrey-nyasulu/" className='text-[dodgerBlue]' target='_blank'>LinkedIn</Link> or my <Link href="https://aubreynyasulu.com/" className='text-[dodgerBlue]' target='_blank'>Personal Website</Link>.

                    {
                        error.length > 0 &&
                        <p className='text-red-600 pt-2'>{error}</p>
                    }

                    <form action={verifyPassID} className='mt-4'>
                        <input
                            type='text'
                            name='passid'
                            placeholder='enter pass ID'
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            className='border py-3 px-4 rounded-md w-full'
                        />
                    </form>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6">
                <DialogClose
                    asChild
                    onClick={() => setModelOpen(false)}
                >
                    <Button
                        className="mt-2 w-full sm:mt-0 sm:w-fit rounded-full px-6 py-3 hover:bg-primary hover:text-white outline-none"
                        variant="secondary"
                    >
                        Skip
                    </Button>
                </DialogClose>
                <DialogClose
                    asChild
                    onClick={verifyPassID}
                >
                    <Button
                        className="mt-2 w-full sm:mt-0 sm:w-fit rounded-full px-6 py-3 hover:bg-primary hover:text-white outline-none"
                        aria-disabled={isSubmitting}
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                        loadingText='Verifying...'
                    >
                        Continue
                    </Button>
                </DialogClose>
            </DialogFooter>
        </>
    )
}