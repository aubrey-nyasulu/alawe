'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { PurchasedItemsModel, PurchaseTransactionModel } from '@/db/models'

const CreatePurchaseFormSchema = z.object({
    supplier_id: z.string({
        invalid_type_error: 'Please select a supplier.',
    }),
    purchase_total: z.coerce
        .number()
        .gt(0, { message: 'purchase total can never be less than 1' }),
    purchased_items: z
        .array(
            z.object({
                quantity: z.coerce
                    .number()
                    .gt(0, { message: 'quantity can never be less than 1' }),
                unit_price: z.coerce
                    .number()
                    .gt(0, { message: 'unit price can never be less than 1' }),
                month: z.string({
                    invalid_type_error: 'Please select a month.',
                }),
                year: z.string({
                    invalid_type_error: 'Please select a year.',
                }),
                item_id: z.string({
                    invalid_type_error: 'Please select an item.',
                }),
            })
        )
})

export type createPurchaseTransactionState = {
    errors?: {
        purchase_total?: string[]
        supplier_id?: string[]
        purchased_items?: string[]
    }
    message?: string | null
}

export async function createPurchaseTransaction(prevState: createPurchaseTransactionState, formData: FormData) {
    // Parse the purchasedItems field as JSON if it's coming as a JSON-encoded string
    const purchasedItems = JSON.parse(formData.get('purchasedItems') as string) || [];

    const validatedFields = CreatePurchaseFormSchema.safeParse({
        supplier_id: formData.get('supplierId'),
        purchase_total: formData.get('purchaseTotal'),
        purchased_items: purchasedItems.map((item: any) => ({
            quantity: item.quantity,
            unit_price: item.unit_price,
            month: item.month,
            year: item.year,
            item_id: item.item_id,
        })),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Purchase transaction.',
        }
    }

    // Prepare data for insertion into the database
    const { purchase_total, supplier_id, purchased_items } = validatedFields.data

    console.log({ purchase_total, supplier_id, purchased_items })

    const purchaseTransaction = await PurchaseTransactionModel.create({ purchase_total, supplier_id })

    if (purchaseTransaction) {
        const purchasedItemsWithTransactioId = purchased_items.map(purchased_item => (
            { ...purchased_item, purchase_transaction_id: purchaseTransaction._id }
        ))
        const res = await PurchasedItemsModel.insertMany(purchasedItemsWithTransactioId)
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/purchasetransactions')
    return { message: `successfully created Purchase Transaction`, success: true }
}
