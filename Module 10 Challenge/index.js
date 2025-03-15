const pool = require('./db.js');
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');


async function mainMenu() {
    console.log(chalk.blue(figlet.textSync('Employee Manager')));

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: chalk.green('What would you like to do?'),
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Exit'
            ]
        }
    ]);

    switch (action) {
        case 'View All Employees':
            console.log(chalk.yellow('Displaying all employees...'));
            await viewEmployees();
            break;
        case 'Add Employee':
            console.log(chalk.yellow('Adding a new employee...'));
            await addEmployee();
            break;
        case 'Update Employee Role':
            console.log(chalk.yellow('Updating employee role...'));
            await updateEmployeeRole();
            break;
        case 'View All Roles':
            console.log(chalk.yellow('Displaying all roles...'));
            await viewRoles();
            break;
        case 'Add Role':
            console.log(chalk.yellow('Adding a new role...'));
            await addRole();
            break;
        case 'View All Departments':
            console.log(chalk.yellow('Displaying all departments...'));
            await viewDepartments();
            break;
        case 'Add Department':
            console.log(chalk.yellow('Adding a new department...'));
            await addDepartment();
            break;
        case 'Exit':
            console.log(chalk.red('Goodbye!'));
            process.exit();
    }

    setTimeout(mainMenu, 1000); // Volver a mostrar el menú después de la acción
}

// 1. Ver empleados
async function viewEmployees() {
    try {
        const { rows } = await pool.query(`
            SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
                   (SELECT first_name || ' ' || last_name FROM employee AS managers WHERE managers.id = employee.manager_id) AS manager
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id;
        `);
        console.table(rows);
    } catch (err) {
        console.error(chalk.red('Error fetching employees:', err));
    }
}

// 2. Agregar empleado
async function addEmployee() {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        { type: 'input', name: 'first_name', message: 'Enter first name:' },
        { type: 'input', name: 'last_name', message: 'Enter last name:' },
        { type: 'input', name: 'role_id', message: 'Enter role ID:' },
        { type: 'input', name: 'manager_id', message: 'Enter manager ID (or leave blank for none):' }
    ]);

    try {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, role_id, manager_id || null]
        );
        console.log(chalk.green(`Added ${first_name} ${last_name} to employees.`));
    } catch (err) {
        console.error(chalk.red('Error adding employee:', err));
    }
}

// 3. Actualizar rol de un empleado
async function updateEmployeeRole() {
    const { employee_id, new_role_id } = await inquirer.prompt([
        { type: 'input', name: 'employee_id', message: 'Enter employee ID to update:' },
        { type: 'input', name: 'new_role_id', message: 'Enter new role ID:' }
    ]);

    try {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [new_role_id, employee_id]);
        console.log(chalk.green(`Updated employee ID ${employee_id} to new role ID ${new_role_id}.`));
    } catch (err) {
        console.error(chalk.red('Error updating employee role:', err));
    }
}

// 4. Ver roles
async function viewRoles() {
    try {
        const { rows } = await pool.query(`
            SELECT role.id, role.title, department.name AS department, role.salary
            FROM role
            JOIN department ON role.department_id = department.id;
        `);
        console.table(rows);
    } catch (err) {
        console.error(chalk.red('Error fetching roles:', err));
    }
}

// 5. Agregar un nuevo rol
async function addRole() {
    const { title, salary, department_id } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter role title:' },
        { type: 'input', name: 'salary', message: 'Enter salary:' },
        { type: 'input', name: 'department_id', message: 'Enter department ID:' }
    ]);

    try {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
        console.log(chalk.green(`Added ${title} to roles.`));
    } catch (err) {
        console.error(chalk.red('Error adding role:', err));
    }
}

// 6. Ver departamentos
async function viewDepartments() {
    try {
        const { rows } = await pool.query('SELECT * FROM department');
        console.table(rows);
    } catch (err) {
        console.error(chalk.red('Error fetching departments:', err));
    }
}

// 7. Agregar un nuevo departamento
async function addDepartment() {
    const { name } = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter the department name:' }
    ]);

    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(chalk.green(`Added ${name} to departments.`));
    } catch (err) {
        console.error(chalk.red('Error adding department:', err));
    }
}

// Iniciar la aplicación
mainMenu();
