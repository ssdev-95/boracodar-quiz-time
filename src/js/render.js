/**
 * 
 **/

export function renderElement({
	source,      // required prop
	target,      // required prop
	template,    // required prop
	props        // optional prop
}) {
	const srcEl = document.createElement(source)

	!!props && (
		Object.entries(props).forEach(([name, prop]) => {
			if(name==='className') {
				srcEl.classList.add(prop)
			} else {
				srcEl.setAttribute(name, prop)
			}
		})
  )

	srcEl.innerHTML = template
	target.appendChild(srcEl)
}

export function renderSimpleTemplate(
	target,
	template
) {
	const targetEl = document.querySelector(target)
	!!targetEl && (targetEl.innerHTML = template)
}
