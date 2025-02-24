import { z } from 'zod'

export const registerSchema = z.object({
	fullname: z
		.string({ required_error: 'Vui lòng nhập họ và tên' })
		.min(1, { message: 'Vui lòng nhập họ và tên' }),
	phone: z
		.string({ required_error: 'Vui lòng nhập số điện thoại' })
		.min(10, { message: 'Số điện thoại phải có 10 số' })
		.max(10, { message: 'Số điện thoại chỉ có 10 số' })
		.regex(/^\d+$/, {
			message: 'Số điện thoại chỉ bao gồm số'
		}),
	email: z
		.string({
			required_error: 'Vui lòng nhập email'
		})
		.email({
			message: 'Email không đúng định dạng'
		}),
	workAt: z.string().min(1, { message: 'Vui lòng chọn khu vực làm việc' }),
	password: z
		.string()
		.min(8, { message: 'Mật khẩu phải có tối thiểu 8 ký tự' })
		.max(64, { message: 'Mật khẩu không quá 64 ký tự' })
		.refine(password => /[A-Z]/.test(password), {
			message: 'Mật khẩu phải có tối thiểu 1 ký tự in hoa'
		})
		.refine(password => /[a-z]/.test(password), {
			message: 'Mật khẩu phải có tối thiểu 1 ký tự in thường'
		})
		.refine(password => /[0-9]/.test(password), {
			message: 'Mật khẩu phải có 1 chữ số'
		}),
	confirmPassword: z.string().min(1, { message: 'Vui lòng nhập lại mật khẩu' })
})

export type RegisterSchema = z.infer<typeof registerSchema>
