async function getIssData() {
	peopleInSpace();
	currentPosition();
	flyByTimes();
}

$(document).ready(function () {
	getIssData();
});
