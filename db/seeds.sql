INSERT INTO department (name)
VALUES ("Sales"), 
       ("Engineering"), 
       ("Finance"), 
       ("Legal");
     

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 1250000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000,4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Emily","Smith", 1, 1),
       ("Michael","Johnson", 2, NULL),
       ("Olivia","Davis", 3, 2),
       ("William","Brown", 4, NULL),
       ("Ava","Wilson", 5, 3),
       ("James","Taylor", 6, NULL),
       ("Sophia","Anderson", 7, 4),
       ("Alexander","Thomas", 8, NULL);
      