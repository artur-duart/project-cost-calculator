'use strict';

const tbody = document.querySelector('tbody');
const projectName = document.querySelector('#project-name');
const pricePerHour = document.querySelector('#price-per-hour');
const startDateTime = document.querySelector('#start-datetime');
const endDateTime = document.querySelector('#end-datetime');
const btn = document.querySelector('#btn-new');

const totalHoursWorked = document.querySelector('#total-hours-worked');
const profit = document.querySelector('#profit');

let projects = [];

// Calcula a diferença em horas entre duas datas.
function calculateHoursBetweenDates(startDate, endDate) {
	let diffInMs = endDate - startDate;
	let diffInHours = diffInMs / (1000 * 60 * 60);
	diffInHours = parseFloat(diffInHours.toFixed(2));
	return diffInHours;
}

// Valida se a data de início é anterior à data de término e se não são iguais.Valida se a data de início é anterior à data de término e se não são iguais.
function validateDates(startDate, endDate) {
	let formattedStartDate = new Date(startDate);
	let formattedEndDate = new Date(endDate);

	if (formattedStartDate > formattedEndDate) {
		alert(
			'Eita, ainda não é possível viajar no tempo, haha! A data e hora de início devem ser anteriores à data e hora de término.'
		);
		return;
	} else if (formattedStartDate == formattedEndDate) {
		alert(
			'A data e hora de início e término não podem ser iguais. Por favor, insira um intervalo de tempo válido.'
		);
		return;
	}

	return calculateHoursBetweenDates(formattedStartDate, formattedEndDate);
}

// Calcula o preço do projeto com base nas horas trabalhadas e no preço por hora.
function calculateProjectPrice(startDate, endDate, pricePerHour) {
	let hours = Number(validateDates(startDate, endDate));
	let price = Number(pricePerHour);
	let finalPrice = hours * price;
	finalPrice = parseFloat(finalPrice.toFixed(2));
	return finalPrice;
}

// Verifica se todos os campos foram preenchidos e se o preço por hora é um número válido.
function validateInputs() {
	if (
		!projectName.value ||
		!pricePerHour.value ||
		!startDateTime.value ||
		!endDateTime.value
	) {
		alert('Por favor, preencha todos os campos.');
		return false;
	} else if (isNaN(pricePerHour.value) || pricePerHour.value <= 0) {
		alert('Por favor, preencha o Valor/Hora com um valor válido!');
		return false;
	}

	return true;
}

// Insere um novo projeto na tabela.
function insertRow(project) {
	let tr = document.createElement('tr');

	tr.innerHTML = `
		<td>${project.name}</td>
		<td>${project.hours}</td>
		<td>R$ ${project.price}</td>
		<td class="column-action"><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>
	`;

	tbody.appendChild(tr);
}

// Calcula o lucro total com base em todos os projetos.
function calculateTotalProfit() {
	let totalProfit = 0;
	for (let project of projects) {
		totalProfit += project.price;
	}
	return totalProfit;
}

// Calcula o total de horas trabalhadas com base em todos os projetos.
function calculateTotalHoursWorked() {
	let totalHours = 0;
	for (let project of projects) {
		totalHours += project.hours;
	}
	return totalHours;
}

// Salva os projetos no localStorage.
function saveData() {
	localStorage.setItem('projects', JSON.stringify(projects));
}

// Carrega os projetos salvos no localStorage.
function loadData() {
	const loadedProjects = localStorage.getItem('projects');

	if (loadedProjects) {
		projects = JSON.parse(loadedProjects);
		projects.forEach((project) => {
			insertRow(project);
		});
		profit.innerHTML = calculateTotalProfit();
		totalHoursWorked.innerHTML = calculateTotalHoursWorked();
	}
}

// Insere um novo projeto se todos os inputs forem preenchidos corretamente.
function insertItem() {
	if (validateInputs()) {
		let investedHours = validateDates(
			startDateTime.value,
			endDateTime.value
		);

		if (isNaN(investedHours)) {
			return;
		}

		let finalPrice = calculateProjectPrice(
			startDateTime.value,
			endDateTime.value,
			pricePerHour.value
		);

		let project = {
			name: projectName.value,
			hours: investedHours,
			price: finalPrice,
		};

		projects.push(project);
		insertRow(project);
		saveData();
	}
}

window.onload = loadData;
btn.onclick = insertItem;
