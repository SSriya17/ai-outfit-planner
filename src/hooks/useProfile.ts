import { useEffect, useState } from "react"; import { localProfileRepository } from "../repositories/ProfileRepository"; import type { Profile } from "../types/profile";
export function useProfile(): Profile | null { const [profile, setProfile] = useState<Profile | null>(null); useEffect(() => { void localProfileRepository.get().then(setProfile); }, []); return profile; }
