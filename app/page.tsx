'use client'

import {Sidebar} from "@/app/components/sidebar";
import {useCallback, useState} from "react";
import {MainView} from "@/app/components/main-view";

export default function Home() {
	const [loading, setLoading] = useState(false)
	const [birds, setBirds] = useState(null)
	const [selectedBirdId, setSelectedBirdId] = useState('');

	const onBirdSelect = useCallback((name) => {
		setSelectedBirdId(name)
	}, [])

	const onSubmit = useCallback(async (count: number, useCache: boolean) => {
		setLoading(true)
		const response = await fetch(`http://localhost:3000/api/birds`, {
			method: 'POST',
			body: JSON.stringify({count, useCache})
		})
		const birds = await response.json()

		setSelectedBirdId('')
		setBirds(birds)
		setLoading(false)
	}, [])

	return (
		<div className='bg-white m-auto w-[960px]'>
			<div className="flex">
				<Sidebar
					birds={birds}
					onBirdSelect={onBirdSelect}
					selectedBirdId={selectedBirdId}
					onSubmit={onSubmit}
					loading={loading}
				/>

				{selectedBirdId && (
					<div className='flex-grow relative'>
						<div className="absolute inset-0 overflow-y-auto">
							<MainView bird={birds.find(bird => bird.id === selectedBirdId)}/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
