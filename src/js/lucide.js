/**
 * Lucide Icons setup
 **/

import {
	createIcons,
	ChevronRight,
	RotateCcw,
	Check,
	X
} from 'lucide'

export function loadIcons() {
	createIcons({
		icons: {
			X,              //data-lucide="x"
			ChevronRight,   //data-lucide="chevron-right"
			RotateCcw,      //data-lucide="rotate-ccw"
			Check           //data-lucide="check"
		}
	});
}

