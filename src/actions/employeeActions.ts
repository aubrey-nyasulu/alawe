'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { ObjectId } from 'mongodb'
import TempEmployeeModel from '@/db/models/TempEmployeeModel'
import { EmployeeModel, SalaryModel } from '../db/models'
import { Employee } from '@/types'

const CreateEmployeeFormSchema = z.object({
    firstName: z.string({
        invalid_type_error: 'Please enter first name.',
    })
        .min(3, { message: 'First name must be at least 3 characters long.' })
        .trim()
    ,
    lastName: z.string({
        invalid_type_error: 'Please enter last name.',
    })
        .min(3, { message: 'Last name must be at least 3 characters long.' })
        .trim(),
    email: z.string({
        invalid_type_error: 'Please enter your email.',
    })
        .min(3, { message: 'Last name must be at least 3 characters long.' })
        .trim(),
    salary: z.string({
        invalid_type_error: 'Please select salary',
    })
        .trim(),
    branchID: z.string({
        invalid_type_error: 'Please select branch.',
    }),
    reportsTo: z.string({
        invalid_type_error: 'Please select branch.',
    }),
})

export type createEmployeeState = {
    errors?: {
        firstName?: string[]
        lastName?: string[]
        email?: string[]
        branchID?: string[]
        salary?: string[]
        reportsTo?: string[]
    }
    message?: string | null
}

export async function createEmployee(prevState: createEmployeeState, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateEmployeeFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        branchID: formData.get('branchID'),
        salary: formData.get('salary'),
        reportsTo: formData.get('reportsTo'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    // Prepare data for insertion into the database
    const { firstName, lastName, email, branchID, salary, reportsTo } = validatedFields.data

    const { amount } = await SalaryModel.findById(new ObjectId(salary))
    const salaryAmount = Number(amount)

    const newEmployee = await TempEmployeeModel.create({ firstname: firstName, lastname: lastName, email, branch_id: new ObjectId(branchID), salary: salaryAmount, reports_to: new ObjectId(reportsTo) })
    // const newEmployee = await EmployeeModel.create({ firstname: firstName, lastname: lastName, email, branch_id: new ObjectId(branchID), salary: salaryAmount, reports_to: new ObjectId(reportsTo) })

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/create')
    return { message: `added ${firstName} ${lastName} successfully. Waiting for CEO to approve`, success: true }
}

export async function getTempEmployees() {
    try {
        const tempEmployees: Employee[] = await TempEmployeeModel.find()

        const serialisedTempEmployees = tempEmployees.map(({ _id, branch_id, email, firstname, lastname, reports_to, salary }) => (
            { _id: _id?.toString(), branch_id: branch_id.toString(), email, firstname, lastname, salary }
        ))

        return serialisedTempEmployees
    } catch (error) {

        return 'some server error'
    }
}