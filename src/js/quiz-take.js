/**
 *
 *
**/

import { questions, quizState, updateQuizState } from './fetch'
import { updateUI } from './quiz-load'

function handleSubmit(event) {
  event.preventDefault()
	const data = new FormData(event.target)
	
  for(const	[inputname] of data) {
  	const index = +inputname.replace('question-00','')
  	const { correctAnswer } = questions[index]
		handleShowAnswerCorrectness({
			inputname,
  		correctAnswer,
			index
  	})
  }
}

function handleShowAnswerCorrectness({
	  inputname,
  	correctAnswer,
	  index
}) {
	const radiogroup = document
		.querySelectorAll(`input[name=${inputname}`)
	
	radiogroup.forEach(radio => {
		const { checked, value } = radio
		radio.setAttribute('disabled', true)
		
		if(!checked) return;

		const isCorrect = value === correctAnswer

		radio.setAttribute('data-correct', isCorrect)
		quizState.step += 1
		quizState.answers[index] = isCorrect ? 'correct' : 'incorrect'
		
		updateQuizState()

		if(isCorrect) {
			handleUpdateQuizDoneCountBadge()
		}
	})

	document
		.getElementById('next-question__icon')
		.removeAttribute('disabled')
}

function handleUpdateQuizDoneCountBadge() {
	const badge = document
		.getElementById('quiz-done-count__badge')
	const quizCount = badge
		.querySelector('#quiz-done__count')
	const count = Number(badge.innerText) +1

	badge.setAttribute('data-done-quizes', !!count)
	quizCount.innerText = count
}

async function handleLoadNextQuestion() {
	updateUI()
}

export function handleQuizCompletion() {
	const form = document.querySelector('.question__form')

	console.log('Deu boa!')

	!!form && form
		.addEventListener('submit', handleSubmit)

	const nextQuestionIcon = document
		.getElementById('next-question__icon')

	nextQuestionIcon
		.addEventListener('click', handleLoadNextQuestion)
	nextQuestionIcon.setAttribute('disabled', undefined)
}

