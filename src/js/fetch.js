/**
 * Quiz logi
 **/

//const API_URL = 'https://the-trivia-api.com/v2/questions?limit=15';
import quiz from './quiz.json'

export let questions = []

export async function fetchQuestions() {
	questions = quiz.questions
	return questions;
}

