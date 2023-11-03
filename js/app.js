document.addEventListener('DOMContentLoaded', function () {

	// letting all dom elements 
	let start = document.querySelector('#start');
	let stop = document.querySelector('#stop');
	let lap = document.querySelector('#lap');
	let laps = document.querySelector('#laps');
	let restart = document.querySelector('#restart');
	let showedTime = document.querySelector('#time');
	let clear = document.querySelector('#clear');

	// letting all global variables
	let counter;
	let date = null;
	let stopDate = null;
	let differenceDate;

	// this event activates other events tied up to other elementes
	start.addEventListener('click', startEvent);

	function startEvent(e) {
		e.preventDefault();

		if (date == null){
			date = getstartingDate();
		}

		setTimer();
		start.removeEventListener('click', startEvent);
		stop.addEventListener('click', stopEvent);
		lap.addEventListener('click', lapEvent);
		restart.addEventListener('click', restartTimer);
	}

	function stopEvent(e) {
		e.preventDefault();

		createStopDate();

		start.addEventListener('click', startEvent);
		stop.removeEventListener('click', stopEvent);
		lap.removeEventListener('click', lapEvent);

		stopTimer();
	}

	function restartTimer(e) {
		e.preventDefault();

		date = null;
		stopDate = null;

		start.addEventListener('click', startEvent);
		stop.removeEventListener('click', stopEvent);
		lap.removeEventListener('click', lapEvent);

		stopTimer();
		clearLaps();
		showedTime.textContent = '00:00:00';
	}

	// just an event to clear existing laps
	clear.addEventListener('click', clearLaps);

	function clearLaps() {
		laps.innerHTML = '';
	}

	// main functions related to changing data and updating it
	function updateDateDifference(){
		let now = new Date();

		if (stopDate == null) {
			console.log('no');
		} else {
			date = new Date(date.getTime() + (now.getTime() - stopDate.getTime()));
		}
	}

	function setTimer() {

		updateDateDifference();

		counter = setInterval(function () {
			let now = new Date();
			differenceDate = now - date;
			let timesArr = getTimerDates();
			updateTimer(timesArr);
		}, 25)
	}

	// small helper functions
	function getstartingDate() {
		return new Date();
	}
	function stopTimer() {
		clearInterval(counter);
	}
	function createStopDate(){
		stopDate = new Date();
	}
	function getTimerDates() {
		return [getMilliseconds(), getSeconds(), getMinutes()];
	}
	function getMilliseconds() {
		let num = (differenceDate / 1000).toFixed(2);
		let decimalVal = num.toString().indexOf('.');
		return num.toString().substring(decimalVal + 1);
	}
	function getSeconds() {
		let second = (Math.floor(differenceDate / (1000) % 60))
		return second < 10 ? '0' + second : second;
	}
	function getMinutes() {
		let minute = Math.floor(differenceDate / (1000 * 60) % 60);
		return minute < 10 ? '0' + minute : minute;
	}
	function updateTimer([ms, s, m]) {
		showedTime.textContent = m + ':' + s + ':' + ms;
	}
	function timeIntoStr(ms, s, m) {
		return m + ':' + s + ':' + ms;
	}

	//all function related to laps
	function lapEvent(e) {
		e.preventDefault();

		let [mSeconds, seconds, minutes] = getTimerDates();
		let lapTime = timeIntoStr(mSeconds, seconds, minutes);
		createLap(lapTime);
	}

	function createLap(text) {
		let lap = document.createElement('p');
		lap.classList.add('timer__lap');
		lap.textContent = text;
		laps.prepend(lap);
	}
})
