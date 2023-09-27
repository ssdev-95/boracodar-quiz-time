/**
 *
 **/

import {
	quizState,
	questions,
	quizStorageKey
} from './fetch'

import { loadIcons } from './lucide';
import { handleQuizCompletion } from './quiz-take';

import {
	renderElement,
	renderSimpleTemplate
} from './render';

import {
	getQuestionTemplate,
	getQuizSummaryTemplate
} from './template-gen';

export async function loadQuiz() {
	const correctAnswersCount = quizState
		.answers
		.reduce((prev, curr) => {
			if(curr === 'correct') { return prev + 1 }
			return prev
		}, 0)

	if(!!!document.getElementById('quiz-done-count__badge')) {
		renderElement({
  		source: 'div',
  		target: document.getElementById('header'),
  		template: `
    		<i data-lucide="check"></i>
  			<span class="text-lg" id="quiz-done__count">
  			  ${correctAnswersCount}
  			</span>
  		`,
  		props: {
  			id: 'quiz-done-count__badge',
  			role: 'badge',
  			'data-done-quizes': 'false'
  		}
		})
	}

	const content = document.getElementById('content')
	content.innerText = ''

	renderElement({
		source: 'form',
		target: content,
		template: getQuestionTemplate({
			step: quizState.step -1,
			...questions[quizState.step-1]
		}),
		props: {
			className: 'question__form',
			id: questions[quizState.step-1].id,
			name: questions[quizState.step-1].id
		}
	})

	renderSimpleTemplate('#step', quizState.step)
	renderSimpleTemplate('#questions-count', questions.length)
	
	console.log('Quiz questions loaded!')
}

export function handleShowQuizSummary() {
	renderSimpleTemplate('#footer', '')

	const header = document.getElementById('header')
	const badge = header.querySelector('div[role=badge]')
	!!badge && badge.remove()

	renderElement({
		source: 'button',
		target: header,
		template: '<i data-lucide="rotate-ccw"></i>',
		props: {
			id: 'quiz-done-restart__button'
		}
	})

	renderSimpleTemplate(
		'#content',
		getQuizSummaryTemplate(questions, quizState)
	)

	loadIcons()

	renderElement({
		source: 'button',
		target: document.getElementById('footer'),
		template: '<strong>Start new Quiz</strong>',
		props: {
			id: 'quiz-start-new__button'
		}
	})

	document
		.getElementById('quiz-done-restart__button')
		.addEventListener('click', () => {
			localStorage.removeItem(quizStorageKey)
			location.reload()
		})

	document
		.getElementById('quiz-start-new__button')
	  .addEventListener('click', () => {
			localStorage.clear()
			location.reload()
		})
}

export function updateUI() {
	if(quizState.step > questions.length) {
		handleShowQuizSummary()
	} else {
	  loadQuiz()
		  .then(loadIcons)
	  	.finally(handleQuizCompletion)
	}
}

