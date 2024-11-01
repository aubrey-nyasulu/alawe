import clsx from 'clsx'
import { ReactNode } from 'react'

export default function RelayCard({ children, containerStyles }: { children: ReactNode, containerStyles?: string }) {
    return (
        <div className={clsx(
            'p-8 bg-gray-200 rounded-xl max-w-[1120px] items-center overflow-hidden',
            {
                containerStyles
            }
        )}>
            {children}
        </div>
    )
}
