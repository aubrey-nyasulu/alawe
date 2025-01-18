'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import InvoiceModel from '../db/models/InvoiceModel'
import { ObjectId } from 'mongodb'
import { verifyPassId } from './authenticateActions'

const CreateInvoiceFormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than MK0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
})


export type createInvoiceState = {
    errors?: {
        customerId?: string[]
        amount?: string[]
        status?: string[]
    }
    message?: string | null
}

const CreateInvoice = CreateInvoiceFormSchema.omit({ id: true, date: true })
export async function createInvoice(prevState: createInvoiceState, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    // Prepare data for insertion into the database
    const { amount, status, customerId } = validatedFields.data
    const amountInCents = Math.round(amount * 100)
    const date = new Date().toISOString().split('T')[0]

    const newInvoice = await InvoiceModel.create({ client_id: new ObjectId(customerId), amount: amountInCents, status, due_date: date, })

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices')
    return { message: `successfully created invoice`, success: true }
}

const UpdateInvoice = CreateInvoiceFormSchema.omit({ id: true, date: true, customerId: true })
export async function updateInvoice(
    id: string,
    passID: string,
    prevState: createInvoiceState,
    formData: FormData,
) {

    console.log({ formData, id, passID })

    const validatedFields = UpdateInvoice.safeParse({
        amount: formData.get('amount'),
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        }
    }

    const passIdExists = await verifyPassId(passID)


    if (!passIdExists.isValid) return { message: `Create, Update and Delete are only allowed for users provided with a passID. You only have Read Permissions within the dahboard. Contact the Owner to be able to perfom all CRUD operations`, success: false }

    const { amount, status } = validatedFields.data
    const amountInCents = Math.round(amount * 100)

    try {
        const updatedInvoice = await InvoiceModel.findOneAndUpdate({ _id: id }, { amount: amountInCents, status })

    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.', success: false }
    }

    revalidatePath('/dashboard/invoices')
    return { message: `successfully updated invoice`, success: true }
}

export async function deleteInvoice(id: string, passID: string) {
    // throw new Error('Failed to Delete Invoice')
    try {
        const passIdExists = await verifyPassId(passID)


        if (!passIdExists.isValid) return { message: `Create, Update and Delete are only allowed for users provided with a passID. You only have Read Permissions within the dahboard. Contact the Owner to be able to perfom all CRUD operations`, success: false }

        await InvoiceModel.findOneAndDelete(new ObjectId(id))
        revalidatePath('/dashboard/invoices')
        return { message: 'Deleted Invoice.' }
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' }
    }
}

