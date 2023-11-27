'use strict';

const tbody = document.querySelector('tbody');
const projectName = document.querySelector('#project-name');
const pricePerHour = document.querySelector('#price-per-hour');
const startDateTime = document.querySelector('#start-datetime');
const endDateTime = document.querySelector('#end-datetime');
const btn = document.querySelector('#btn-new');

const totalHoursWorked = document.querySelector('#total-hours-worked');
const profit = document.querySelector('#profit');

function calculateHoursBetweenDates(startDate, endDate) {
	let diffInMs = new Date(endDate) - new Date(startDate);
	let diffInHours = diffInMs / (1000 * 60 * 60);
	return diffInHours.toFixed(2);
}

function calculateProjectPrice(startDate, endDate, pricePerHour) {
	let hours = calculateHoursBetweenDates(startDate, endDate);
	let price = pricePerHour;
	return hours * price;
}

function insertItem() {
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
    <td>${investedHours}</td>
    <td>${finalPrice}</td>
  `;

	tbody.appendChild(tr);
}

btn.onclick = insertItem;
