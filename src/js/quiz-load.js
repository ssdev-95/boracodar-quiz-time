
import { fetchQuestions } from './fetch'

export async function loadQuiz() {
	const questions = await fetchQuestions();
	console.log('Quiz questions loaded!')

	const content = document.getElementById('content')
	content.innerText = ''

	questions.forEach((question, index) => {
		content.appendChild(
			renderQuestion({ ...question, index })
		)
	})
	const footer = document.createElement('footer')
	footer.setAttribute('id', 'footer')
	footer.innerHTML = `
	  <strong>
		  <span>1</span>/5
		</strong>

		<button disabled id="next-question__icon">
		  <i data-lucide="chevron-right"></i>
		</button>
	`
	document.getElementById('app').appendChild(footer)
}

function renderQuestion({ id, question, correctAnswer, incorrectAnswers, index }) {
	const alternatives = [
		...incorrectAnswers,
		correctAnswer
	]

	const questionForm = document.createElement('form')
	questionForm.classList.add('question__form')
	questionForm.setAttribute('name', id)
	questionForm.setAttribute('id', id)

	const qIdentifier = `question-00${index}`

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
