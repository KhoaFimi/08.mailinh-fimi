import { FC, PropsWithChildren } from 'react'

import Header from '@/components/header'

const AuthLayout: FC<PropsWithChildren> = async ({ children }) => {
	return (
		<div className='flex h-screen w-full items-center justify-center'>
			<Header />
			{children}
		</div>
	)
}

export default AuthLayout
