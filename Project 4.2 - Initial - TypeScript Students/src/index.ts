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

function refreshTable(table: HTMLTableElement, student: Student[]) {
    table.querySelector("tbody")!.innerHTML =  "";
    students.forEach( (student, index) => {
        if (student.focusArea && !student.dateRegistrationSuspended) {
        addRow(table, students[index]);
        }
       
        // if (!student.focusArea) {
        //     addRow(table, students[index]);
        //     }
    })
}

//filters 


window.onload = function () {
    refreshTable(selectTable(), students);
}



