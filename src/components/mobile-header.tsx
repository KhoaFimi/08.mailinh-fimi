import Image from 'next/image'

const MobileHeader = () => {
	return (
		<header className='sticky inset-x-0 top-0 z-50 flex w-full items-center justify-center bg-gradient-to-r from-primary from-30% to-secondary shadow-md'>
			<div className='container flex items-center justify-center px-2 py-2 lg:flex-row'>
				<Image
					src='/logo.png'
					width={3148}
					height={1367}
					alt='logo'
					className='w-36'
				/>
			</div>
		</header>
	)
}

export default MobileHeader
