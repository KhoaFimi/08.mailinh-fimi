import '@/app/globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { FC, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'
import { QueryProvider } from '@/providers/query.provider'
import ThemeProvider from '@/providers/theme.provider'

import ogImage from '../../public/og.jpg'

export const metadata: Metadata = {
	title: {
		default: 'Milinh',
		template: 'Mailinh | %s'
	},
	description: 'Mai Linh Corporation',
	metadataBase: new URL('https://mailinh.fimi.tech'),
	openGraph: {
		title: 'Mai Linh Corporation',
		description: 'Mở thẻ không cần bảng lương',
		url: 'https://mailinh.fimi.tech',
		siteName: 'FIMI',
		images: [
			{
				url: ogImage.src,
				width: ogImage.width,
				height: ogImage.height
			}
		]
	}
}

const font = Montserrat({
	subsets: ['vietnamese', 'latin']
})

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body className={cn('antialiased', font.className)}>
				<ThemeProvider>
					<QueryProvider>
						{children}
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryProvider>
					<GoogleAnalytics gaId='G-9K0WHTB0EB' />
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
