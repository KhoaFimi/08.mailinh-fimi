'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { login } from '@/app/(auth)/login/_actions/login'
import {
	LoginSchema,
	loginSchema
} from '@/app/(auth)/login/_schemas/login.schema'
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
import { cn } from '@/lib/utils'

const LoginForm = () => {
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			phoneOrEmail: '',
			password: ''
		}
	})

	const [error, setError] = useState<string | undefined>(undefined)

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: LoginSchema) => await login(values),
		onSuccess: data => {
			if (data.error) {
				setError(data.error)
				return
			}
		}
	})

	const onSubmit = (values: LoginSchema) => {
		mutate(values)
	}

	return (
		<FormWrapper
			header={{
				isLogo: false,
				title: 'Đăng nhập'
			}}
			backButton={{
				text: 'Bạn chưa có tài khoản',
				href: '/register'
			}}
		>
			<Form {...form}>
				<form
					autoComplete='autocomplete_off_randString'
					className='flex flex-col gap-2.5 px-2 pt-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						name='phoneOrEmail'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-medium text-foreground/70'>
									Email hoặc số điện thoại
								</FormLabel>
								<FormControl className='mt-2'>
									<Input
										className={cn(
											'text-sm',
											'transition-all duration-300 ease-in-out',
											'placeholder:text-sm placeholder:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
										)}
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex flex-col space-y-2'>
						<FormField
							name='password'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='font-medium text-foreground/70'>
										Mật khẩu
									</FormLabel>
									<FormControl className='mt-2'>
										<Input
											className={cn(
												'text-sm',
												'transition-all duration-300 ease-in-out',
												'placeholder:text-sm placeholder:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
											)}
											type='password'
											disabled={isPending}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Link href='/forgot-password'>
							<p className='text-right text-xs/3 font-medium text-primary/50 transition-all duration-150 ease-out hover:text-primary hover:underline'>
								Quên mật khẩu
							</p>
						</Link>
					</div>

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

export default LoginForm
