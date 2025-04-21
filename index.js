import express from "express";
import { getTempOfCity } from "./services/getTemp.js";

const app = express();
const PORT = 4040;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { 
    title: "Главная страница", 
    message: "Погода и время в разных городах" 
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", { 
    title: "Погода", 
    message: "Узнайте погоду в вашем городе" 
  });
});

app.get("/weather/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const { temp } = await getTempOfCity(city);
    
    res.render("weather", {
      title: "Погода", 
      message: `Погода в городе ${city}`,
      city: city,
      temp: Math.round(temp)
    });
  } catch (error) {
    res.render("weather", {
      title: "Ошибка",
      message: `Ошибка: ${error.message}`,
      error: true
    });
  }
});

app.get("/time", (req, res) => {
  res.render("time", { 
    title: "Время", 
    message: "Узнайте время в вашем городе" 
  });
});

app.get("/time/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const { timezone } = await getTempOfCity(city);
    const utcTime = new Date(Date.now() + timezone * 1000);
    
    const hours = String(utcTime.getUTCHours()).padStart(2, "0");
    const minutes = String(utcTime.getUTCMinutes()).padStart(2, "0");
    const seconds = String(utcTime.getUTCSeconds()).padStart(2, "0");
    const time = `${hours}:${minutes}:${seconds}`;
    
    res.render("time", {
      title: "Время",
      message: `Время в городе ${city}`,
      city: city,
      time: time
    });
  } catch (error) {
    res.render("time", {
      title: "Ошибка",
      message: `Ошибка: ${error.message}`,
      error: true
    });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});