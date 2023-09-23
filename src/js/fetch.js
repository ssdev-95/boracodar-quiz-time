/**
 * Quiz logi
 **/

//const API_URL = 'https://the-trivia-api.com/v2/questions?limit=15';
import quiz from './quiz.json'

export async function fetchQuestions() {
	return quiz.questions;
}

