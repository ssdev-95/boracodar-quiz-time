/**
 * Lucide Icons setup
 **/

import {
	createIcons,
	ChevronRight,
	Check,
	X
} from 'lucide'

export function loadIcons() {
	createIcons({
		icons: {
			X,              //data-lucide="x"
			ChevronRight,   //data-lucide="chevron-right"
			Check           //data-lucide="check"
		}
	});
}

