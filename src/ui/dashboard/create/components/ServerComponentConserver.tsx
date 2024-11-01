import { ReactNode, } from 'react';

export default function ServerComponentConserver({
    children,
    ...props
}: {
    children: ReactNode,
    props?: any[]
}) {

    return (
        <>
            {children}
        </>
    )
}