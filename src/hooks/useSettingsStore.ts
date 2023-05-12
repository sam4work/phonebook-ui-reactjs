import PageSettingsStore from "@/stores/PageSettingsStore";
import { useStore } from "zustand";

export default function useSettingsStore() {

	return useStore(PageSettingsStore)
}