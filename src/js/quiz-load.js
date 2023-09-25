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
	const content = document.getElementById('content')
	content.innerHTML = `
	  <span>Showing quiz summary</span>
	`
	localStorage.clear()
}

export function updateUI() {
	if(quizState.step >= questions.lengtg) {
		handleShowQuizSummary()
	} else {
	  loadQuiz()
		  .then(loadIcons)
		.finally(handleQuizCompletion)
	}
}

