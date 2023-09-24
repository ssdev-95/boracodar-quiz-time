/**
 *
 * Main js file
 **/

import './src/css/reset.css'
import './src/css/index.css'
import './src/css/quiz.css'

import './src/js/eruda'
import { loadIcons } from './src/js/lucide'
import { loadQuiz } from './src/js/quiz-load'

document.querySelector('#app').innerHTML = `
	<header id="header">
	  <strong role="title" class="text-xl">
		  👋 Quiz<span>.time</span>
		</strong>

		<div role="badge" data-done-quizes="false" id="quiz-done-count__badge">
		  <i data-lucide="check"></i>
			<span class="text-lg" id="quiz-done__count">0</span>
		</div>
  </header>

	<main id="content">
	  <span id="loading" class="text-md">loading</span>
	</main>
`
await loadQuiz()

window.onload = () => {
	loadIcons()
}

