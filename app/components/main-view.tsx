'use client'

import {Bird} from "@/app/types";

type MainViewProps = {
	bird: Bird
}

export const MainView = (props: MainViewProps) => {
	return (
		<div className='p-8'>
			<h1 className='text-xl font-bold'>{props.bird.name}</h1>
			<br/>
			<div className='h-[480px]' style={{
				backgroundSize: 'cover',
				backgroundImage: `url(${props.bird.image})`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center'
			}}></div>
			<br/>
			<a className='text-blue-500 underline' target='_blank'
			   href={`https://maps.google.com/?q=${props.bird.location.lat},${props.bird.location.lat}`}>View on Google
				Maps</a>
			<div className='my-4' key={props.bird.id}>
				<audio controls>
					<source src={props.bird.sound} type="audio/mpeg"/>
					Your browser does not support the audio element.
				</audio>
			</div>
		</div>
	)
}