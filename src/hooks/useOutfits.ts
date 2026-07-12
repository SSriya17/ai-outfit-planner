import { useEffect, useState } from "react"; import { localOutfitRepository } from "../repositories/OutfitRepository"; import type { Outfit } from "../types/outfit";
export function useOutfits(): readonly Outfit[] { const [items, setItems] = useState<readonly Outfit[]>([]); useEffect(() => { void localOutfitRepository.getAll().then(setItems); }, []); return items; }
