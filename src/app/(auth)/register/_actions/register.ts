'use server'

import * as argon2 from 'argon2'
import { randomUUID as uuidV4 } from 'crypto'
import jwt, { Secret } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import {
	RegisterSchema,
	registerSchema
} from '@/app/(auth)/register/_schemas/register.schema'
import { config } from '@/lib/config'
import { getSheets } from '@/lib/server/google-sheets'
import { parseDate } from '@/lib/server/parse-date'

const genCode = (): string => {
	const numbers = Array.from({ length: 5 }, () =>
		Math.floor(Math.random() * 10)
	)

	return `MALI${numbers.join('')}`
}

export const register = async (values: RegisterSchema) => {
	const cookieStore = await cookies()

	const validatedData = registerSchema.safeParse(values)

	if (!validatedData.success)
		return {
			error: validatedData.error.message
		}

	const body = validatedData.data

	const sheets = await getSheets()

	const {
		data: { values: users }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: config.SHEET_USER_ID,
		range: config.SHEET_USER_NAME
	})

	if (!users)
		return {
			error: 'Hệ thống bị gián đoạn, vui lòng thử lại sau'
		}

	const duplicatedIndex = users.findIndex(user => {
		const duplicatedEmail = user.includes(body.email)
		const duplicatedPhone = user.includes(body.phone)

		return duplicatedEmail || duplicatedPhone
	})

	if (duplicatedIndex !== -1)
		return {
			error: 'Người dùng đã tồn tại'
		}

	const id = uuidV4()
	const code = genCode()

	const hashedPassword = await argon2.hash(body.password)

	await sheets.spreadsheets.values.append({
		spreadsheetId: config.SHEET_USER_ID,
		range: config.SHEET_USER_NAME,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [
				[
					parseDate(new Date()),
					`'${id}`,
					code,
					'MALI_ADMIN',
					body.fullname,
					`'${body.phone}`,
					body.email,
					hashedPassword,
					body.workAt
				]
			]
		}
	})

	const accessToken = jwt.sign(
		{
			sub: id,
			publisherCode: code,
			managerCode: 'MALI_ADMIN',
			fullname: body.fullname
		},
		config.ACCESS_TOKEN_SECRET as Secret
	)

	cookieStore.set('access-token', accessToken, {
		httpOnly: true,
		secure: true,
		maxAge: 60 * 60 * 24 * 30,
		sameSite: 'none',
		path: '/'
	})

	redirect('/campaign')
}
