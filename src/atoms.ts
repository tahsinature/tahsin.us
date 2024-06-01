import { atom } from "jotai";
import { GuestBookComment } from "@/types";

export const currentUserCommentsAtom = atom<GuestBookComment[]>([]);
