import axios from "axios";
import "dotenv/config";
const KEY = process.env.API_KEY;

export async function getTempOfCity(city) {
	try {
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`
		);
		const { timezone } = data;
		const { temp } = data.main;
		return { temp, timezone };
	} catch (error) {
		throw new Error(error.response.data.message);
	}
}
