'use server'

import { z } from 'zod'
import { ObjectId } from 'mongodb'
import TempEmployeeModel from '@/db/models/TempEmployeeModel'
import { EmployeeModel, SalaryModel } from '../db/models'
import { Employee } from '@/types'
import { verifyPassId } from './authenticateActions'

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

export async function createEmployee(passID: string, prevState: createEmployeeState, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateEmployeeFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        branchID: formData.get('branchID'),
        salary: formData.get('salary'),
        reportsTo: formData.get('reportsTo'),
    })

    console.log('innnnnnnn!!!!!!!')

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    const passIdExists = await verifyPassId(passID)


    if (!passIdExists.isValid) return { message: `Create, Update and Delete are only allowed for users provided with a passID. You only have Read Permissions within the dahboard. Contact the Owner to be able to perfom all CRUD operations`, success: false }

    // Prepare data for insertion into the database
    const { firstName, lastName, email, branchID, salary, reportsTo } = validatedFields.data

    const { amount } = await SalaryModel.findById(new ObjectId(salary))
    const salaryAmount = Number(amount)

    try {
        console.log('about to add employee')

        let user = await TempEmployeeModel.find().where({ email })

        if (user.length > 0) {
            return { message: `Failed to add employee, email is already taken`, success: false }
        }
        user = await EmployeeModel.find().where({ email })

        if (user.length > 0) {
            return { message: `Failed to add employee, email is already taken`, success: false }
        }

        const res = await TempEmployeeModel.create({ firstname: firstName, lastname: lastName, email, branch_id: new ObjectId(branchID), salary: salaryAmount, reports_to: new ObjectId(reportsTo) })

        console.log('led', { res })

        if (res) {
            return { message: `added ${firstName} ${lastName} successfully. Waiting for CEO to approve`, success: true }
        } else {
            return { message: `Some Error occured`, success: false }
        }

    } catch (error: any) {
        return { message: `Failed to add empl0yee, please try again after some minutes.`, success: false }
    }
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