import { API_URL } from "./ConnectionData";
import { Result } from "../types/Result";

export async function SendResults(results: Result[]){
  try {
    console.log(results);
    const response = await fetch(`${API_URL}/send_result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(results)
    });
    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}