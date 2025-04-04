"use client"

import { useContext, useEffect } from 'react';
import ReviewEmployeeCard from './ReviewEmployeeCard';
import { PageStateContext } from '@/context/PageStateProvider';


export default function TabsReviewOtherContent() {

    const { reviewOther } = useContext(PageStateContext)

    return (
        <div className='space-y-6'>
            {
                reviewOther?.length
                    ? (
                        <>
                            {
                                reviewOther.map(Employee => (
                                    <ReviewEmployeeCard
                                        key={Employee._id}
                                        {...{ Employee: Employee }}
                                    />
                                ))
                            }
                        </>
                    )
                    : <p className='text-gray-800'>nothing to review at the moment</p>
            }
        </div>
    );
}



