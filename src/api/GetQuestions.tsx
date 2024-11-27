import { API_URL } from "./ConnectionData";

export async function GetQuestions(){
  try {
    const response = await fetch(`${API_URL}/questions`);
    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}