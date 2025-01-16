'use server';

import { z } from 'zod'
// import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import ReportModel from '@/db/models/ReportModel';
import { Report, } from '@/types';
import { pusher } from '@/lib/pusher'
import { NotificationModel } from '@/db/models';
import { passIDs } from '@/lib/utils';

const CreatereportFormSchema = z.object({
    title: z.string({
        invalid_type_error: 'Please enter title.',
    })
        .min(3, { message: 'title must be at least 3 characters long.' })
        .trim(),
    from: z.string({
        invalid_type_error: 'sender not specified',
    })
        .trim(),
    to: z.string({
        invalid_type_error: 'Please select receipient',
    })
        .trim(),
    File: z.instanceof(File, {
        message: 'Please upload a valid file.',
    }),
});

export type createReport = {
    errors?: {
        title?: string[],
        from?: string[],
        to?: string[],
        file?: string[],
    }
    message?: string | null
}

export async function uploadImage(passID: string, prev: createReport, formData: FormData) {

    // Validate form using Zod
    const validatedFields = CreatereportFormSchema.safeParse({
        from: formData.get('from'),
        to: formData.get('to'),
        title: formData.get('title'),
        File: formData.get('image')
    })


    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    if (!passIDs.includes(passID)) return {
        message: `Create, Update and Delete are only allowed for users provided with a passID. You only have Read Permissions within the dahboard. Contact the Owner to be able to perfom all CRUD operations`,
        success: false
    }

    const { from, to, title, File } = validatedFields.data

    if (from.toString() === to.toString()) return { message: `you can not send to yourself`, success: false }

    // const blob = await put(File.name, File, {
    //     access: 'public',
    // });

    const blob = {
        title: 'title',
        pathname: 'pathname',
        downloadUrl: 'downloadUrl'
    }

    const report: Report = {
        title,
        documentName: blob.pathname,
        downloadableUrl: blob.downloadUrl,
        from,
        to
    }

    const res = await ReportModel.create(report)

    if (res) {
        const notification = {
            message: 'You have a new report',
            type: 'new report',
            userId: to,
            target: from
        }

        await pusher.trigger('notifications-channel', 'new-notification', {
            message: 'A new notification!',
        })

        await NotificationModel.create(notification)
    }

    revalidatePath('/dashboard/reports');
    return { message: `report sent successfully`, success: true }
}
