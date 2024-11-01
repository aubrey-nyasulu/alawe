"use client"

import { Employee, Notification, User } from "@/types"
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { getNotifications } from "@/actions/notificationsActions"
import { Session } from "next-auth"
import { getTempEmployees } from "@/actions/employeeActions"
import Pusher from 'pusher-js'
import { usePathname } from "next/navigation"

type PageState = {
    theme: 'light' | 'dark' | 'system',
    handleThemeChange: (selectedTheme: "light" | "dark" | "system") => void,
    showMenu: boolean,
    setShowMenu: Dispatch<SetStateAction<boolean>>,
    editProfileModalShow: boolean
    setEditProfileModalShow: Dispatch<SetStateAction<boolean>>
    editInvoiceModalShow: { open: boolean, id: string }
    setEditInvoiceModalShow: Dispatch<SetStateAction<{ open: boolean, id: string }>>
    reviewOther: Employee[]
    setReviewOther: Dispatch<SetStateAction<Employee[]>>
    notifications: Notification[]
    setNotifications: Dispatch<SetStateAction<Notification[]>>
    updatePageStateState?(): Promise<boolean>
}

const initialPageState: PageState = {
    theme: 'light',
    handleThemeChange: () => null,
    showMenu: false,
    setShowMenu: () => null,
    editProfileModalShow: false,
    setEditProfileModalShow: () => null,
    editInvoiceModalShow: { open: false, id: '' },
    setEditInvoiceModalShow: () => null,
    reviewOther: [],
    setReviewOther: () => null,
    notifications: [],
    setNotifications: () => null,
}

export const PageStateContext = createContext<PageState>(initialPageState)

type PageStateProviderProps = {
    children: React.ReactNode
    session: Session | null
}

export default function PageStateProvider({ session, children }: PageStateProviderProps) {
    const [reviewOther, setReviewOther] = useState<Employee[]>([])
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [editProfileModalShow, setEditProfileModalShow] = useState<boolean>(false)
    const [editInvoiceModalShow, setEditInvoiceModalShow] = useState<{ open: boolean, id: string }>({ open: false, id: '' })
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

    const user = session?.user as User

    const updateReview = async () => {
        try {
            const data = await getTempEmployees()

            if (data === "some server error") return false

            setReviewOther(data)

            return true
        } catch (error) {
            console.log('page context fetch revie other error', error)

            return false
        }
    }

    const updateNotifications = async () => {
        try {
            if (user?._id) {
                const data = await getNotifications(user._id)
                setNotifications([...data])

                return true
            }

            return false
        } catch (error) {
            console.log('page context updateNotificaations error', error)

            return false
        }
    }

    async function updatePageStateState() {
        try {
            let res = await updateNotifications()

            if (!res) throw new Error('failed to init page state. An error occured while trying to fetch notifications')

            res = await updateReview()

            if (!res) throw new Error('failed to init page state. An error occured while trying to fetch Other reviews')

            return true
        } catch (error) {
            throw new Error(`som error occured while updating state: ${error}`)

            return false
        }
    }

    useEffect(() => {
        updatePageStateState()
        // updateReview()

    }, [])

    // useEffect(() => {
    //     const eventSource = new EventSource('/api/realtime/notifications/dynamicSlug')

    //     eventSource.onmessage = (event) => {
    //         const data = JSON.parse(event.data)
    //         if (data?.fullDocument) {
    //             const { _id, userId, message, type, target } = data.fullDocument
    //             console.log('Real-time data:', { _id, userId, message, type, target })

    //             setNotifications([...notifications, { _id, userId, message, type, target }])
    //         }
    //     }

    //     return () => {
    //         eventSource.close()
    //     }
    // }, [])

    const pathname = usePathname()
    useEffect(() => {
        if (pathname.startsWith('/dasboard')) {
            const boltDiv = document.querySelector('.bpFabIcon')
            if (boltDiv) {
                document.body.removeChild(boltDiv)
            }
        }
    }, []);

    useEffect(() => {
        // Initialize Pusher
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '',
        })

        // Subscribe to the notifications channel
        const channel = pusher.subscribe('notifications-channel')

        // Listen for 'new-notification' events
        channel.bind('new-notification', async (data: { message: string }) => {
            //   setNotifications((prev) => ([...prev, data.message])
            let res = await updateNotifications()
        })

        // Cleanup on component unmount
        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }
    }, [])

    // Apply theme based on user preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system'
        if (savedTheme) {
            setTheme(savedTheme)
            applyTheme(savedTheme)
        } else {
            applySystemTheme() // Default to system theme if no preference is saved
        }
    }, [])

    // Function to apply the appropriate theme
    const applyTheme = (theme: 'light' | 'dark' | 'system') => {
        if (theme === 'light') {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        } else if (theme === 'dark') {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            applySystemTheme()
        }
    }

    // Function to apply system theme
    const applySystemTheme = () => {
        const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (systemDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', 'system')
    }

    // Handle theme change from dropdown
    const handleThemeChange = (selectedTheme: 'light' | 'dark' | 'system') => {
        setTheme(selectedTheme)
        applyTheme(selectedTheme)
    }

    // Listen for system theme changes (for system option)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = () => {
            if (theme === 'system') {
                applySystemTheme()
            }
        }
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [theme])

    return (
        <PageStateContext.Provider value={
            {
                theme,
                handleThemeChange,
                showMenu,
                setShowMenu,
                reviewOther,
                setReviewOther,
                notifications,
                setNotifications,
                editInvoiceModalShow,
                setEditInvoiceModalShow,
                editProfileModalShow,
                setEditProfileModalShow,
                updatePageStateState
            }
        }>
            {children}
        </PageStateContext.Provider>
    )
}