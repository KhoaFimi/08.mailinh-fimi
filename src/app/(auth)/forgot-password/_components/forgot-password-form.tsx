'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { checkLegitUser } from '@/app/(auth)/forgot-password/_action/check-legit-user'
import {
	ForgotPasswordSchema,
	forgotPasswordSchema
} from '@/app/(auth)/forgot-password/_schemas/forgot-password-schema'
import { FormReponse } from '@/components/form-response'
import { FormWrapper } from '@/components/form-wrapper'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const ForgotPasswordForm = () => {
	const form = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const [error, setError] = useState<string | undefined>(undefined)

	const { isPending, mutate } = useMutation({
		mutationFn: async (values: ForgotPasswordSchema) =>
			await checkLegitUser(values),
		onSuccess: data => {
			if (data.error) {
				setError(data.error)
			}
		}
	})

	const onSubmit = (values: ForgotPasswordSchema) => {
		mutate(values)
	}

	return (
		<FormWrapper
			header={{
				isLogo: false,
				title: 'Quên mật khẩu',
				description: 'Vui lòng nhập email đã đăng ký đề lấy lại mật khẩu'
			}}
			backButton={{
				text: 'Đăng nhập',
				href: '/login'
			}}
		>
			<Form {...form}>
				<form
					autoComplete='autocomplete_off_randString'
					className='flex flex-col gap-2.5 px-2 pt-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						name='email'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
									<Mail
										className='size-3'
										strokeWidth={3}
									/>
									<p className='leading-none'>Email </p>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										className='border border-primary text-xs caret-primary focus-visible:outline-none focus-visible:ring-0'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormReponse.error message={error} />

					<Button
						type='submit'
						size='sm'
						disabled={isPending}
						className='items-center gap-4 bg-gradient-to-tr from-primary from-30% to-secondary text-xs font-bold'
					>
						{isPending && <Loader2 className='size-5 animate-spin' />}
						Tiếp tục
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

export default ForgotPasswordForm
