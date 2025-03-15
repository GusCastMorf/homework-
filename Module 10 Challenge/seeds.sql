INSERT INTO department (name) VALUES 
('HR'), ('Engineering'), ('Finance');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 2),
('HR Manager', 70000, 1),
('Accountant', 75000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Johnson', 1, NULL),
('Bob', 'Smith', 2, NULL),
('Charlie', 'Davis', 3, 1);
