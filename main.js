#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blueBright("******Welcome to Student Management System******"));
//for generate 5 digits random students ID;
const randomNumber = Math.floor(10000 + Math.random() * 9000);
let myBalance = 0;
//for inquiring students name and course;
let answer = await inquirer.prompt([
    {
        name: "students",
        type: "input",
        message: "Enter student name: ",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter student name";
        }
    },
    {
        name: "courses",
        type: "list",
        message: "Select the course enroll: ",
        choices: ["English Speaking", "English Writing", "English Grammar", "IELTS"]
    }
]);
//course fees 
const tutionFee = {
    "English Speaking": 3000,
    "English Writing": 4000,
    "English Grammar": 5000,
    "IELTS": 6000
};
console.log(`\nTution Fee: ${tutionFee[answer.courses]}/-\n`);
console.log(`Balance: ${myBalance}\n`);
//collect payment information
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select payment type: ",
        choices: ["Bank Transfer", "Jazz Cash", "Easy Paisa"]
    },
    {
        name: "amount",
        type: "input",
        message: "Enter amount: ",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a amount";
        }
    }
]);
console.log(chalk.cyanBright(`\nyou have select payment method ${paymentType.payment}`));
const tuitionFees = tutionFee[answer.courses];
const paymentAmount = parseInt(paymentType.amount);
if (tuitionFees === paymentAmount) {
    console.log(chalk.blueBright(`\nCongratulations..!! you have successfully enrolled in ${answer.courses}. \n`));
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "what would you like to do next?",
            choices: ["View Status", "Exit"]
        }
    ]);
    if (ans.select === "View Status") {
        console.log(chalk.blueBright("********* Status***********\n"));
        console.log(`Student Name: ${answer.students}`);
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Course Name: ${answer.courses}`);
        console.log(`Tuition Fees Paid: ${paymentAmount}`);
        console.log(`Balance: ${myBalance += paymentAmount}`);
    }
    else {
        console.log(chalk.yellowBright(`\nExiting Student Management System`));
    }
}
else {
    console.log(chalk.redBright(`\nInvalid amound due to course`));
}
