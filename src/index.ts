import data from './data.js' ;

const students = JSON.parse(data);

interface Student {
        id: string,
        dateAdmission: string,
        firstName: string,
        lastName: string,
        birthYear: string,
        focusArea?: string[] | string,
        dateRegistrationSuspended? : string
}


function addRow(table : HTMLTableElement, student: Student) {
    
    //We know for sure it will not be null so we added the exclamation point afterwards
    let tr = table.querySelector("tbody")!.insertRow();
    const name = tr.insertCell();
    name.appendChild(document.createTextNode(student.firstName + " " + student.lastName));

    const age = tr.insertCell();
    age.appendChild(document.createTextNode((new Date().getFullYear() - parseFloat(student.birthYear)).toString()));

    const majors = tr.insertCell();

    if(student.focusArea){
        let focusAreaArray : string = "";
        if (typeof student.focusArea == "string") {
            majors.appendChild(document.createTextNode(student.focusArea));
        } else {
            student.focusArea.forEach(area => {
                focusAreaArray += area + " , ";
            })
            majors.appendChild(document.createTextNode(focusAreaArray.slice(0,-2)));
        }
    } else {
        majors.appendChild(document.createTextNode("N/A"));
    }

    const status = tr.insertCell();
    
    if(student.dateRegistrationSuspended){
        status.appendChild(document.createTextNode("Inactive"));
    } else {
        status.appendChild(document.createTextNode("Active"));
    }

}

// select HTML table
function selectTable(){
    return document.querySelector("#students-table") as HTMLTableElement;
}

// add a row

function refreshTablewithFilter(table: HTMLTableElement, student: Student[], filterFn: (student: Student) => boolean) {
   
    table.querySelector("tbody")!.innerHTML =  "";
    students.filter(filterFn).forEach(student =>
            addRow(table, student)); 
}

function clearSelected() {
    document.querySelector('#all')?.classList.remove('selected');
    document.querySelector('#active')?.classList.remove('selected');
    document.querySelector('#inactive')?.classList.remove('selected');
    document.querySelector('#no-focus')?.classList.remove('selected');
    document.querySelector('#alphabetical-order')?.classList.remove('selected');
}



function filters(table: HTMLTableElement, student: Student[]) {

    document.querySelector('#all')?.classList.add('selected');

    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => 
        button.addEventListener('click', () => {
            clearSelected();
            const id = button.id;
            switch (id) {
                case 'all':
                    document.querySelector('#all')?.classList.add('selected');
                    refreshTablewithFilter(selectTable(), students, () => true);
                    break;
                case 'active':
                    document.querySelector('#active')?.classList.add('selected');
                    refreshTablewithFilter(selectTable(), students, (student) => !student.dateRegistrationSuspended);
                    break;
                case 'inactive':
                    document.querySelector('#inactive')?.classList.add('selected');
                    refreshTablewithFilter(selectTable(), students, (student) => !!student.dateRegistrationSuspended);
                    break;
                case 'no-focus':
                    document.querySelector('#no-focus')?.classList.add('selected');
                    refreshTablewithFilter(selectTable(), students, (student) => !student.focusArea);
                    break;
                case 'alphabetical-order':
                    document.querySelector('#alphabetical-order')?.classList.add('selected');
                    refreshTablewithFilter(table, students.sort((a, b) => a.lastName.localeCompare(b.lastName)), () => true); 
                    break;
            }}))


}

//filters 

window.onload = function () {
    refreshTablewithFilter(selectTable(), students, () => true);
    filters(selectTable(), students);
}



