/**
 *
 **/

import {
	quizState,
	questions,
	fetchQuestions
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
	await fetchQuestions();	

	/*if(quizState.answers.length === questions.length) {
		handleShowQuizSummary()
		return
	}*/

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
	header.querySelector('div[role=badge]').remove()

	renderElement({
		source: 'button',
		target: header,
		template: '<i data-lucide="rotate-ccw"></i>',
		props: {
			id: 'quiz-done-reload__button'
		}
	})

	renderSimpleTemplate(
		'#content',
		getQuizSummaryTemplate(questions, quizState)
	)

	loadIcons()

	document
		.getElementById('quiz-done-reload__button')
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

