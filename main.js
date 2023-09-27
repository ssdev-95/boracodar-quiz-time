/**
 *
 **/

import './src/css/quiz.css'

import './src/js/eruda'
import { loadIcons } from './src/js/lucide'
import { quizState } from './src/js/fetch'
import { loadQuiz } from './src/js/quiz-load'
import { handleQuizCompletion } from './src/js/quiz-take'
import { renderSimpleTemplate } from './src/js/render'

const appTemplate = `
	<header id="header">
	  <strong role="title" class="text-xl">
		  👋 Quiz<span>.time</span>
		</strong>

		<!--div role="badge" data-done-quizes="false" id="quiz-done-count__badge">
		  <i data-lucide="check"></i>
			<span class="text-lg" id="quiz-done__count">
			  0
			</span>
		</div-->
  </header>

	<main id="content">
	  <div id="loading">
		  <div id="loader-spinner__outter" >
			  <div id="loader-spinner__inner" />
			</div>
		</div>
	</main>

	<footer id="footer">
	  <strong>
		  <span id="step">0</span>
			/
			<p id="questions-count">0</p>
		</strong>

		<button disabled id="next-question__icon">
		  <i data-lucide="chevron-right"></i>
		</button>
	</footer>
`

window.onload = () => {
	renderSimpleTemplate('#app', appTemplate)
	loadQuiz()
		.then(loadIcons)
		.finally(()=>{
			handleQuizCompletion()
			const correctAnswersCount = quizState.answers
				.reduce((prev, curr) => {
					if(curr==='correct') return prev+1;
					return prev;
				}, 0)

			document
				.getElementById('quiz-done__count')
			  .innerText = correctAnswersCount
		})
}

