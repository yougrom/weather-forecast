Оговорим выпадающий список. Пусть это будет элемент Select. Пользователь может выбрать город и мы должны получить по нему погоду. Возможны два варианта реализации:


<select>
   <option>London</option>
   <option>Minsk</option>
   <option>Gdansk</option>
   <option>Kyiv</option>
<select>

т.е. мы, получаем погоду по имени города. Чем плохо? Тем, что названия городов могут дублироваться и система openweathermap может неправильно дать погоду только по названию.

В json файле задания есть такое понятие как id города. Это более удобный вариант, поскольку однозначно определяет сам город. Отлично. В HTML сверстаем select следующего вида:


<select id="city">
   <option value="23232">London</option>
   <option value="33456">Minsk</option>
   <option value="87968">Gdansk</option>
   <option value="39849">Kyiv</option>
<select>

где цифры возьмите из json файла - это id указанного города.

Давайте напишем MVP (minimum viable product, MVP) приложения. Переместимся в js файл и набросаем его структуру.

Основная задача - получение прогноза погоды. Следовательно, вынесем ее в функцию getWeather. Напишем:


function getWeather() {

}
При загрузке страницы, нужно запускать эту функцию. Дополним:


function getWeather() {

}
getWeather(); 
Также, функция должна запускаться при изменении select.


function getWeather() {
}

getWeather();
document.querySelector('#city').onchange = getWeather;
Все, костяк готов.

Функция getWeather получает из select id города.


function getWeather() {
	const cityId = document.querySelector('#city').value;
}
Теперь нужно сделать fetch запрос. Обращаю ваше внимание, что у нас есть 2 важных параметра для запроса - id города и APPID. Также, у нас есть URI - куда мы отправляем запрос. Давайте красиво это оформим и логически свяжем. В начале файла js перед функцией добавьте:


const param = {
	"url" : "https://api.openweathermap.org/data/2.5/",
	"appid" : "ваш_ключ"
}
Теперь мы готовы "красиво" оформить fetch.


function getWeather() {
	const cityId = document.querySelector('#city').value;
	fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
	.then(weather => {
			return weather.json();
		}).then(showWeather);
}
Отступление. Почему удобно вынести url и appid в отдельный объект? Потому, что appid может меняться и нужно иметь возможность его заменить не лопатя код. Аналогично url - возможно вы перейдете на новую версию API, и заменять 2.5 удобнее в начале кода.

Что такое showWeather? Это функция показа полученной погоды. Да, мы можем прямо внутри then прописать разбор. Но тогда получится "вложенность спагетти код" и не стоит забывать принцип функций - функция должна делать одно дело, но делать хорошо. Напишем функцию показа прогноза погоды:


function showWeather(data) {
	console.log(data);
}
По сути, showWeather это функция callback, которая в аргумент data получит прогноз погоды от openweathermap и тут вы будете его разбирать и выводить.

Итак, давайте сведем костяк js кода, чтобы не запутаться.


function getWeather() {

}

function showWeather(data) {
	console.log(data);
	// здесь вы выводите на страницу
}

getWeather();
document.querySelector('#city').onchange = getWeather;
Отлично! Нужны доп.функции? Создавайте. Допишите вывод погоды на страницу: температуру, информацию о ветре, влажности, давлении, название города.

Как усложнить задачу? Мы выводили select руками - верстали в html. Дальше - не обязательно. Создайте объект в формате


const cities =  {
   23232 : "london",
   33456 : "minsk",
   и так далее.
}
С помощью createElement создайте select и перебирая cities наполните select элементами option...

