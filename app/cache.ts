import {Bird} from "@/app/types";
import {MAX_CACHE_SIZE} from "@/app/config";

type Cache = {
	birds: Array<Bird>
}

export const cache: Cache = {
	birds: []
}

export const setBirdsCache = (birds: Bird[]) => {
	cache.birds = [...birds, ...cache.birds].slice(0, MAX_CACHE_SIZE)
}