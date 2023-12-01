'use strict';

const tbody = document.querySelector('tbody');
const projectName = document.querySelector('#project-name');
const pricePerHour = document.querySelector('#price-per-hour');
const startDateTime = document.querySelector('#start-datetime');
const endDateTime = document.querySelector('#end-datetime');
const btn = document.querySelector('#btn-new');

const totalHoursWorked = document.querySelector('#total-hours-worked');
const profit = document.querySelector('#profit');

const projectPrices = [];
const projectHours = [];

function calculateHoursBetweenDates(startDate, endDate) {
	let diffInMs = endDate - startDate;
	let diffInHours = diffInMs / (1000 * 60 * 60);
	diffInHours = parseFloat(diffInHours.toFixed(2));
	projectHours.push(diffInHours);
	return diffInHours;
}

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

function calculateProjectPrice(startDate, endDate, pricePerHour) {
	let hours = Number(validateDates(startDate, endDate));
	let price = Number(pricePerHour);
	let finalPrice = hours * price;
	finalPrice = parseFloat(finalPrice.toFixed(2));
	projectPrices.push(finalPrice);
	return finalPrice;
}

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

function sumArrayElements(array) {
	return array.reduce((a, b) => {
		return a + b;
	});
}

function insertItem() {
	if (validateInputs()) {
		let tr = document.createElement('tr');
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

		tr.innerHTML = `
    <td>${projectName.value}</td>
		<td>${investedHours.toLocaleString()}</td>
    <td>R$ ${finalPrice.toLocaleString()}</td>
		<td class="column-action"><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>
  `;

		tbody.appendChild(tr);
		profit.innerHTML = sumArrayElements(projectPrices);
		totalHoursWorked.innerHTML = sumArrayElements(projectHours);
	}
}

btn.onclick = insertItem;
