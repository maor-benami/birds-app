import {createRef, useEffect, useRef, useState} from "react";

type InfiniteScrollProps<T> = {
	items: Array<T>
	render: (item: T) => JSX.Element
	pageSize: number
	timeout: number
	loading: boolean
}

export const InfiniteScroll = <T, >(props: InfiniteScrollProps<T>) => {
	const [page, setPage] = useState(1);
	const [paginating, setPaginating] = useState(false);
	const ref = createRef()

	useEffect(() => {
		if (!ref.current) return

		const onScroll = () => {
			if (!ref.current) return

			if (paginating) return

			if (props.items.length <= page * props.pageSize) {
				return
			}

			if (ref.current.scrollHeight - 1 <= (ref.current.scrollTop + ref.current.offsetHeight)) {
				setPaginating(true)
				setTimeout(() => {
					setPage(prev => prev + 1)
					setPaginating(false)
				}, props.timeout)
			}
		}

		ref.current.addEventListener('scroll', onScroll)

		return () => {
			if (!ref.current) return

			ref.current.removeEventListener('scroll', onScroll)
		}
	}, [])

	return (
		<div
			ref={ref}
			className='flex items-center flex-col gap-2 overflow-y-auto p-4 w-full h-full'
		>
			{props.loading ? (
				<div>
					<span className="loader"></span>
				</div>
			) : (
				[...props.items || []].slice(0, page * props.pageSize).map(item => {
					return props.render(item)
				})
			)}

			{(props.items?.length > page * props.pageSize) && (
				<div className='p-2'>
					<span className="loader"></span>
				</div>
			)}
		</div>
	)
}