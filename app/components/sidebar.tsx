'use client'

import clsx from "clsx";
import {Bird} from "@/app/types";
import {InfiniteScroll} from "@/app/components/infinite-scroll";

type SidebarItemProps = {
	title: string
	imageUrl: string
	key: string
	active: boolean
	onClick: () => void
}

const SidebarItem = (props: SidebarItemProps) => {
	const className: string = clsx(
		'w-full border rounded p-2 flex flex-col gap-1 hover:shadow-md cursor-pointer',
		props.active && 'border-blue-500'
	)

	return (
		<div
			onClick={props.onClick}
			className={className}
		>
			<div className='h-48' style={{
				backgroundSize: 'cover',
				backgroundImage: `url(${props.imageUrl})`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center'
			}}></div>
			<div>{props.title}</div>
		</div>
	)
}

type SidebarProps = {
	birds: Array<Bird>
	selectedBirdId: string
	onBirdSelect: (name: string) => void
	onSubmit: (count: number, useCache: boolean) => void
	loading: boolean
}

export const Sidebar = (props: SidebarProps) => {
	const onSubmit = (e) => {
		e.preventDefault()

		const fd = new FormData(e.target);
		const count = Number(fd.get("count"));
		const useCache = fd.get("useCache") === 'on';

		props.onSubmit(count, useCache)
	}

	return (
		<div className='bg-white border-e h-[100vh] flex flex-col'>
			<form
				className='flex flex-col gap-2 p-4'
				onSubmit={onSubmit}
			>
				<div className='flex gap-2'>
					<input
						defaultValue='15'
						name='count'
						className='py-1 px-2 rounded border'
						type="number"
						placeholder='Number of birds'
					/>
					<button className='bg-black text-white rounded py-1 px-2'>Submit</button>
				</div>

				<label>
					<input type="checkbox" name="useCache"/> Use Cache
				</label>
			</form>

			<div className='flex-grow relative'>
				<div className='absolute inset-0'>
					<InfiniteScroll<Bird>
						loading={props.loading}
						pageSize={5}
						timeout={1500}
						items={props.birds}
						render={(bird) => {
							return (
								<SidebarItem
									key={bird.id}
									title={bird.name}
									imageUrl={bird.image}
									active={props.selectedBirdId === bird.id}
									onClick={() => {
										props.onBirdSelect(bird.id)
									}}
								/>
							)
						}}
					/>
				</div>
			</div>
		</div>
	)
}