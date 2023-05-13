import { create } from 'zustand'
import { persist } from "zustand/middleware";

type Store = {
  dark: boolean
  toggleDark: () => void
}

const documentRoot = document.documentElement;

const PageSettingsStore = create<Store>()(
	persist(
		(set, get) => ({
				dark: false,
				toggleDark: () => {

					set({dark : !get().dark})
					
					if(get().dark == true){
						documentRoot.classList.add("dark")
					}else{
						documentRoot.classList.remove("dark")
					}

				},
		}),
		{
				name: 'page-settings-store', // name of the item in the storage (must be unique)
		}
)
)

export default PageSettingsStore;