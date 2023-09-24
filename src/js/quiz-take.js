/**
 *
 *
**/

import { questions } from "./fetch"

const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
	e.preventDefault()
	const data = new FormData(form)
	
	for(const	[inputname] of data) {
		const index = inputname.replace('question-00','')
		const { correctAnswer } = questions[+index]
		handleShowAnswerCorrectness({
			inputname,
			correctAnswer
		})
	}
})

function handleShowAnswerCorrectness({
	  inputname,
  	correctAnswer
}) {
	const radiogroup = document
		.querySelectorAll(`input[name=${inputname}`)
	
	radiogroup.forEach(radio => {
		const { checked, value } = radio
		radio.setAttribute('disabled', true)
		
		if(!checked) return;

		radio.setAttribute(
			'data-correct',
			value === correctAnswer
	  )

		if(value === correctAnswer) {
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

document.getElementById('next-question__icon')
  .addEventListener('click', () => {
		alert('Carregando proxima questao, aguarde!!')
	})

