let student = "John";
let grade1 = parseFloat("8");
let grade2 = parseFloat("9");
let isApproved : boolean;

function average(num1:number, num2:number) : number {
    return (num1 + num2) /2;
}

isApproved = average(grade1, grade2) > 7;

console.log(average(grade1, grade2));

// Arrays

let gradesList = ["8", "7", "9", "5", "6" ];

function finalGrade(grades : string[]) {
    let sum = 0;
    grades.forEach(grade => {
        sum += parseFloat(grade);
    });
    return sum / grades.length
}

console.log(finalGrade(gradesList));

//Objects

// type Student = {
//     name: string, 
//     grades: string[], 
//     isApproved?: boolean
// };

// Interface for student 

interface Person {
    name: string, 
}

interface Student extends Person {
    grades: string[], 
    isApproved?: boolean
};

function printStudent(student: Student) {
    console.log( "Name: " + student.name);
    console.log("Final Grade: " + finalGrade(student.grades));
    if (typeof student.isApproved == "boolean"){
    console.log("Is Approved: " + student.isApproved + "\n");
    }

}

let newStudent = {
    name : "John", 
    grades: ["8", "7"],
}

printStudent(newStudent);


let students : Student[] = [
    {
        name : "John", 
        grades: ["8", "7", "10", "6"],
        isApproved: true
    }, 
    {
        name : "Mary", 
        grades: ["9", "4", "6"] 
    }
];

students.forEach( student => {
    printStudent(student);
});


// Literal Types mix with Union Types

let size: "small" = "small";

let id: string | number;

id = "2";

// need to handle possible errors

function buttonStyle(size: "small" | "large") {
    let style: {
        height: string, 
        width: string
    };

    if (size == "small") {
        style = {
            height: "60px", 
            width: "100px"
        }
    }else {
        style = {
            height: "80px", 
            width: "140px"
        }
    }
    return style;
}

console.log(buttonStyle("large"));

// makes sure to check both types are taken care of
// function printId(id: string | number) {
//     if (typeof id == "string") {
//     id.toUpperCase();
//     }
//     return id;
// }

function printId(id: string | number | undefined) {
    
    if(typeof id == "number") {
        console.log("id: " + id);
    } else if (typeof id == "string") {
        console.log("id: " + id.toUpperCase());
    }
    else {
        console.log("id: No Id");
    }
}

let studentId = "efg33";

printId(studentId);

//Any Data Type

function doubleNum(num: number) {
    return num * 2;
}

doubleNum(2);

// HTML Elements

function getName(input : HTMLInputElement| null) {
    let name = input?.value;
    console.log(name);
}
//type assertion so that it trusts us that it will be as we say
let input = document.querySelector("input#firstName") as HTMLInputElement;

getName(input);
