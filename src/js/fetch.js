/**
 * Quiz logi
 **/

const API_URL = 'https://the-trivia-api.com/v2/questions?limit='
const questionStorageKey = 'quiz@questions__v1'
const quizStorageKey = 'quiz@state__v1'

export let questions = []

export let quizState = {
	step: 1,
	answers: []
}

export function loadCachedQuestions() {
	return [
		localStorage.getItem(questionStorageKey),
		localStorage.getItem(quizStorageKey)
	]
}

export async function fetchQuestions() {
	const limit = !!location.search ?
		+location.search.replace('?limit=','') : 5

	const [cachedQuiz, cachedState] = loadCachedQuestions()

	if(!!cachedQuiz) {
		questions = JSON.parse(cachedQuiz)

		if(!!cachedState) {
			quizState = JSON.parse(cachedState)
		} else {
			localStorage.setItem(
				quizStorageKey,
				JSON.stringify(quizState)
			)
		}
		return
	}

	const response = await fetch(`${API_URL}${limit}`)
	const data = await response.json()
	questions = data

	localStorage.setItem(
		questionStorageKey,
		JSON.stringify(data)
	)

	localStorage.setItem(
		quizStorageKey,
		JSON.stringify(quizState)
	)

	return
}

export function updateQuizState() {
	localStorage.removeItem(quizStorageKey)

	localStorage.setItem(
		quizStorageKey,
		JSON.stringify(quizState)
	)
}

