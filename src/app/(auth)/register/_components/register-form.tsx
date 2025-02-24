'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { getCities } from '@/actions/get-citites'
import { register } from '@/app/(auth)/register/_actions/register'
import {
	RegisterSchema,
	registerSchema
} from '@/app/(auth)/register/_schemas/register.schema'
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
import FormCombobox from '@/components/ui/form-combobox'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const RegisterForm = () => {
	const [error, setError] = useState<string | undefined>(undefined)

	const { data: citiesData, isPending: getCitiesPending } = useQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			fullname: '',
			email: '',
			phone: '',
			workAt: '',
			password: '',
			confirmPassword: ''
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: RegisterSchema) => await register(values),
		onSuccess: data => {
			if (data.error) {
				setError(data.error)
				return
			}
		}
	})

	const onSubmit = (values: RegisterSchema) => {
		mutate(values)
	}

	return (
		<FormWrapper
			header={{
				isLogo: false,
				title: 'Đăng ký'
			}}
			backButton={{
				text: 'Bạn đã có tài khoản',
				href: '/login'
			}}
		>
			<Form {...form}>
				<form
					className='space-y-2'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						name='fullname'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-medium text-foreground/70'>
									Họ và tên
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

					<FormField
						name='email'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-medium text-foreground/70'>
									Email
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

					<FormField
						name='phone'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-medium text-foreground/70'>
									Số điện thoại
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

					<FormCombobox
						name='workAt'
						control={form.control}
						popoverClassName='w-[350px]'
						form={form}
						className='w-full'
						label={
							<FormLabel className='flex items-start space-x-1 text-xs font-semibold tracking-tight text-foreground/80'>
								Khu vực làm việc
							</FormLabel>
						}
						initalData=''
						items={
							citiesData
								? citiesData.map(city => ({
										id: city.id,
										value: city.full_name,
										label: city.full_name
									}))
								: []
						}
						isLoading={isPending || getCitiesPending}
						isMessage
					/>

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

					<FormField
						name='confirmPassword'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-medium text-foreground/70'>
									Xác nhận mật khẩu
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

					<FormReponse.error message={error} />

					<div className='pt-2'>
						<Button
							type='submit'
							className='w-full cursor-pointer font-medium'
							disabled={isPending}
						>
							Đăng ký
						</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	)
}

export default RegisterForm
