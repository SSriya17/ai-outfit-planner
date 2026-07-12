import { profileStorage } from "../storage/profileStorage"; import type { Profile } from "../types/profile";
export interface ProfileRepository { get(): Promise<Profile>; save(value: Profile): Promise<void>; }
export const localProfileRepository: ProfileRepository = { async get() { return profileStorage.get(); }, async save(value) { profileStorage.set(value); } };
