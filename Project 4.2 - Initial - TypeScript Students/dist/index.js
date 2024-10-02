import data from './data.js';
const students = JSON.parse(data);
function addRow(table, student) {
    //We know for sure it will not be null so we added the exclamation point afterwards
    let tr = table.querySelector("tbody").insertRow();
    const name = tr.insertCell();
    name.appendChild(document.createTextNode(student.firstName + " " + student.lastName));
    const age = tr.insertCell();
    age.appendChild(document.createTextNode((new Date().getFullYear() - parseFloat(student.birthYear)).toString()));
    const majors = tr.insertCell();
    if (student.focusArea) {
        let focusAreaArray = "";
        if (typeof student.focusArea == "string") {
            majors.appendChild(document.createTextNode(student.focusArea));
        }
        else {
            student.focusArea.forEach(area => {
                focusAreaArray += area + " , ";
            });
            majors.appendChild(document.createTextNode(focusAreaArray.slice(0, -2)));
        }
    }
    else {
        majors.appendChild(document.createTextNode("N/A"));
    }
    const status = tr.insertCell();
    if (student.dateRegistrationSuspended) {
        status.appendChild(document.createTextNode("Inactive"));
    }
    else {
        status.appendChild(document.createTextNode("Active"));
    }
}
// select HTML table
function selectTable() {
    return document.querySelector("#students-table");
}
// add a row
function refreshTablewithFilter(table, student, filterFn) {
    table.querySelector("tbody").innerHTML = "";
    students.filter(filterFn).forEach(student => addRow(table, student));
}
function clearSelected() {
    var _a, _b, _c, _d, _e;
    (_a = document.querySelector('#all')) === null || _a === void 0 ? void 0 : _a.classList.remove('selected');
    (_b = document.querySelector('#active')) === null || _b === void 0 ? void 0 : _b.classList.remove('selected');
    (_c = document.querySelector('#inactive')) === null || _c === void 0 ? void 0 : _c.classList.remove('selected');
    (_d = document.querySelector('#no-focus')) === null || _d === void 0 ? void 0 : _d.classList.remove('selected');
    (_e = document.querySelector('#alphabetical-order')) === null || _e === void 0 ? void 0 : _e.classList.remove('selected');
}
function filters(table, student) {
    var _a;
    (_a = document.querySelector('#all')) === null || _a === void 0 ? void 0 : _a.classList.add('selected');
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => button.addEventListener('click', () => {
        var _a, _b, _c, _d, _e;
        clearSelected();
        const id = button.id;
        switch (id) {
            case 'all':
                (_a = document.querySelector('#all')) === null || _a === void 0 ? void 0 : _a.classList.add('selected');
                refreshTablewithFilter(selectTable(), students, () => true);
                break;
            case 'active':
                (_b = document.querySelector('#active')) === null || _b === void 0 ? void 0 : _b.classList.add('selected');
                refreshTablewithFilter(selectTable(), students, (student) => !student.dateRegistrationSuspended);
                break;
            case 'inactive':
                (_c = document.querySelector('#inactive')) === null || _c === void 0 ? void 0 : _c.classList.add('selected');
                refreshTablewithFilter(selectTable(), students, (student) => !!student.dateRegistrationSuspended);
                break;
            case 'no-focus':
                (_d = document.querySelector('#no-focus')) === null || _d === void 0 ? void 0 : _d.classList.add('selected');
                refreshTablewithFilter(selectTable(), students, (student) => !student.focusArea);
                break;
            case 'alphabetical-order':
                (_e = document.querySelector('#alphabetical-order')) === null || _e === void 0 ? void 0 : _e.classList.add('selected');
                refreshTablewithFilter(table, students.sort((a, b) => a.lastName.localeCompare(b.lastName)), () => true);
                break;
        }
    }));
}
//filters 
window.onload = function () {
    refreshTablewithFilter(selectTable(), students, () => true);
    filters(selectTable(), students);
};
