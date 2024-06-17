import {Bird} from "@/app/types";
import { v4 as uuidv4 } from 'uuid';

export const getBirds = async (count: number) => {
	const url = `https://zapari.any.do/birds/${count}`

	const response = await fetch(url)
	const data: {items: Array<Bird>} = await response.json()

	return data.items.map(bird => {
		return {
			id: uuidv4(),
			...bird
		}
	})
}