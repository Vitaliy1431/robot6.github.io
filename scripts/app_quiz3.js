const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("У вас 0 правильных ответов, оценка 2", 0),
	new Result("У вас 1 правильный ответ, оценка 2", 1),
	new Result("У вас 2 правильных ответа, оценка 2", 2),
	new Result("У вас 3 правильный ответа, оценка 3", 3),
	new Result("У вас 4 правильных ответа, оценка 4", 4),
	new Result("У вас 5 правильных ответов, оценка 5", 5)
];

//Массив с вопросами
const questions = 
[
	new Question("Как приблизить камеру к роботу?",
	[
		new Answer("Правой кнопкой мыши", 0),
		new Answer("Колёсиком мыши", 1),
		new Answer("Левой кнопкой мыши", 0),
		new Answer("Никак", 0)
	]),

	new Question("Если нажать правую кнопку мыши и крутить мышку:",
	[
		new Answer("Робот переместиться по полигону", 0),
		new Answer("Поменяется ориентация камеры сверху, сбоку", 0),
		new Answer("Камера повернется", 1),
		new Answer("Повернётся робот", 0)
	]),
	new Question("Какую иконку в правом меню нужно использовать, чтобы камера переместилась в место где находиться робот, и следила за ним далее?",
	[
		new Answer("<img src='scripts/тест3_вариант_ответа1.png' width='50' height='50'>", 0),
		new Answer("<img src='scripts/тест3_вариант_ответа2.png' width='50' height='50'>", 1),
		new Answer("<img src='scripts/тест3_вариант_ответа3.png' width='50' height='50'>", 0),
		new Answer("<img src='scripts/тест3_вариант_ответа4.png' width='50' height='50'>", 0)
	]),
	new Question("Что сделает Омегабот после запуска этой программы?<br/><br/><img src='scripts/тест3_задание4.png' width='500' height='250'>",
	[
		new Answer("Проедет вперёд 1 секунду, повернёт, проедет вперёд 1 секунду", 0),
		new Answer("Будет ехать вперёд бесконечно", 0),
		new Answer("Не будет двигаться", 1),
		new Answer("Проедет вперёд 1 секунду, повернёт, будет ехать вперёд бесконечно", 0)
	]),

	new Question("Выберите, какой траектории соответствует программа:<br/><br/><img src='scripts/тест3_задание5.png' width='500' height='250'>",
	[
		new Answer("Треугольник", 1),
		new Answer("Круг", 0),
		new Answer("Квадрат", 0),
		new Answer("Ромб", 0)
	]),
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length)
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}

		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Правильные ответы: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index)
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct)
		{
			btns[index].className = "button button_wrong";
		}
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}
