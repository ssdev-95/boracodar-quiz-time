/**
 *
 **/

import { fetchQuestions, quizState, questions } from './fetch'
import { loadIcons } from './lucide';
import { handleQuizCompletion } from './quiz-take';

export async function loadQuiz() {
	const questions = await fetchQuestions();
	console.log('Quiz questions loaded!')

	const content = document.getElementById('content')
	content.innerText = ''

	const step = quizState.step -1
	content.appendChild(
		renderQuestion({ ...questions[step], step })
	)

	document.getElementById('step').innerText = quizState.step
	document.getElementById('questions-count').innerText = questions.length
}

function renderQuestion({ id, question, correctAnswer, incorrectAnswers, step }) {
	const alternatives = [
		...incorrectAnswers,
		correctAnswer
	]

	const questionForm = document.createElement('form')
	questionForm.classList.add('question__form')
	questionForm.setAttribute('name', id)
	questionForm.setAttribute('id', id)

	const qIdentifier = `question-00${step}`

	const questionBody = `
	  <header class="question-form__header">
  		<strong role="title">
  			${question.text}
  		</strong>

			<button>
			  <i data-lucide="chevron-right"></i>
			</button>
		</header>
		
		<div class="q-answers__container">
		  ${alternatives.map(
				(answer)=>renderAnswer(qIdentifier, answer)
		  ).join('\n')}
		</div>
	`

	questionForm.innerHTML = questionBody
	return questionForm;
}

function renderAnswer(name, answer) {
	const answerBody = `
	  <label class="q-answer__wrapper">
  		<div class="q-answer__feedback">
			  <i data-lucide="x"></i>
				<i data-lucide="check"></i>
			</div>

		  <img
			  src="/img/adventure.svg"
				alt="adventure"
			/>

			<span>${answer}</span>

			<input
			  class="sr-only"
			  name="${name}"
			  type="radio"
				value="${answer}"
			/>
		</label>
	`

	return answerBody
}

function handleShowQuizSummary() {
	console.log(quizState)
	const content = document.getElementById('content')

	document.getElementById('footer').innerHTML = ''
	
	const header = document.getElementById('header')
	header.querySelector('div[role=badge]').remove()

	const reloadQuizButton = document.createElement('button')
	reloadQuizButton.setAttribute('id','quiz-done-count__badge')
	reloadQuizButton.innerHTML = `
	  <i data-lucide="rotate-ccw"></i>
	`
	header.appendChild(reloadQuizButton)

	content.innerHTML = `
	  <strong class="text-lg" id="post-quiz__title">
		  Showing quiz summary
		</strong>

		<div id="post-quiz__summary">
		  ${questions.map((question, idx)=>`
				<div class="quiz-summary__item" data-state="${quizState.answers[idx]}">
				  <strong>${idx+1}) ${question.question.text}</strong>

					<i data-lucide="${
						quizState.answers[idx] === 'correct' ?
							'check' : 'x'
					}"></i>
				</div>
			`).join('\n')}
		</div>
	`
	
	loadIcons()
	
	reloadQuizButton.addEventListener('click', () => {
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

