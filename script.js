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

function calculateHoursBetweenDates(startDate, endDate) {
	let diffInMs = new Date(endDate) - new Date(startDate);
	let diffInHours = diffInMs / (1000 * 60 * 60);
	return parseFloat(diffInHours.toFixed(2));
}

function calculateProjectPrice(startDate, endDate, pricePerHour) {
	let hours = Number(calculateHoursBetweenDates(startDate, endDate));
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
		let investedHours = calculateHoursBetweenDates(
			startDateTime.value,
			endDateTime.value
		);
		let finalPrice = calculateProjectPrice(
			startDateTime.value,
			endDateTime.value,
			pricePerHour.value
		);

		tr.innerHTML = `
    <td>${projectName.value}</td>
		<td>${investedHours.toLocaleString()}</td> <!-- formata para string aqui -->
    <td>R$ ${finalPrice.toLocaleString()}</td> <!-- formata para string aqui -->
		<td class="column-action"><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>
  `;

		tbody.appendChild(tr);
		console.log(sumArrayElements(projectPrices));
	}
}

btn.onclick = insertItem;
