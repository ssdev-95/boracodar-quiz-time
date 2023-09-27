/**
 *
 **/


export function getQuestionTemplate({
	question,
	correctAnswer,
	incorrectAnswers,
	step
}) {
	const alternatives = [...incorrectAnswers, correctAnswer]

	const qIdentifier = `question-00${step}`

	return `
	  <header class="question-form__header">
  		<strong role="title">
  			${question.text}
  		</strong>

			<button>
			  <i data-lucide="chevron-right"></i>
			</button>
		</header>
		
		<div class="q-answers__container">
		  ${alternatives.map(answer => getAnswerTemplate(
				qIdentifier,
				answer
			)).join('\n')}
		</div>
	`
}

function getAnswerTemplate(name, answer) {
	return `
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
}

export function getQuizSummaryTemplate(quiz, state) {
	return `
	  <strong class="text-lg" id="post-quiz__title">
		  Showing quiz summary
		</strong>

		<div id="post-quiz__summary">
		  ${quiz.map((question, idx)=>`
				<div class="quiz-summary__item" data-state="${state.answers[idx]}">
				  <strong>${idx+1}) ${question.question.text}</strong>

					<i data-lucide="${
						state.answers[idx] === 'correct' ?
							'check' : state.answers[idx] === 'incorrect' ? 'x' : 'minus'
					}"></i>
				</div>
			`).join('\n')}
		</div>
	`
}

