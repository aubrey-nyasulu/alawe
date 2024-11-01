'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { SupplierModel } from '../db/models'

const CreateSupplierFormSchema = z.object({
    name: z.string({
        invalid_type_error: 'Please enter first name.',
    })
        .min(3, { message: 'Name must be at least 3 characters long.' })
        .trim()
    ,
    contact: z.string({
        invalid_type_error: 'Please enter contact.',
    })
        .min(8, { message: 'contact must be at least 8 characters long.' })
        .trim()
    ,
    address: z.string({
        invalid_type_error: 'Please enter address',
    })
        .min(6, { message: 'address info must be at least 6 characters long.' })
        .trim()
})

export type createSupplierState = {
    errors?: {
        name?: string[]
        contact?: string[]
        address?: string[]
    }
    message?: string | null
}

export async function createSupplier(prevState: createSupplierState, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateSupplierFormSchema.safeParse({
        name: formData.get('name'),
        contact: formData.get('contact'),
        address: formData.get('address'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    // Prepare data for insertion into the database
    const { name, contact, address } = validatedFields.data

    const newSupplier = await SupplierModel.create({ name, contact, address })

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/create')
    return { message: `added ${name} successfully`, success: true }
}