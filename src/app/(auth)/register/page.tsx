import { QueryClient } from '@tanstack/react-query'

import { getCities } from '@/actions/get-citites'
import RegisterForm from '@/app/(auth)/register/_components/register-form'

const RegisterPage = async () => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['cities'],
		queryFn: getCities
	})

	return <RegisterForm />
}

export default RegisterPage
