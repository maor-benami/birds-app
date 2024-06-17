import {Bird} from "@/app/types";
import {NextResponse} from 'next/server'
import {getBirds} from "@/app/external-api";
import {cache, setBirdsCache} from "@/app/cache";

const randomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function POST(req) {
	const {count, useCache} = await req.json();

	let birds: Array<Bird> = []

	/*
	* Randomly select birds from cache
	* */
	if (useCache) {
		const cached = [...cache.birds]

		for (let i = 0; i < count; i++) {
			const random = randomNumber(0, cached.length - 1)
			const item = cached[random]

			if (item) {
				birds.push(item)
			}

			cached.splice(random, 1)
		}
	}

	const delta = count - birds.length

	/*
	* If needed, populated the delta with items from the api
	* */
	if (delta) {
		const items = await getBirds(delta)

		birds = [...birds, ...items]

		setBirdsCache(items)
	}

	console.log()
	console.log('* From Cache:', count - delta)
	console.log('* From External API:', delta)
	console.log('* Cache size:', cache.birds.length)
	console.log()

	return NextResponse.json(birds)
}