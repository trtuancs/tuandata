---
title: Fix error "Incorrect string value" in MySQL
author: Tuan Data
publishDate: 25 Jun 2024
updatedDate: 25 Jun 2024
description: Hello everyone, today I would like to share about "How to fix error Incorrect string value in MySQL". I hope my following guide will be helpful to everyone.
tags: [mysql, mysql error]
draft: false
# ogImage: /social-card.png
coverImage:
    src: "mysql.png"
    alt: Fix error "Incorrect string value" in MySQL
#! TODO
---
## Introduction
Hello everyone, today I would like to share about "How to fix error Incorrect string value in MySQL".
I hope my following guide will be helpful to everyone.

## Context
In MySQL, I create a new table as the following command:
```sql
CREATE TABLE Test (
    names varchar(255)
);
```
After creating the table, I insert into the table with the following command:
```sql
INSERT INTO Test VALUES ('Tiến');
```
Immediately MySQL will throw an error like that:
```sql
ERROR 1366 (HY000): Incorrect string value: '\xF0\x93\x80\x80' for column 'names' at row 1
```

## Causation
First, I will run the following command to view information about the Test table:
```sql
SHOW CREATE TABLE Test \G
```
The returned result is as follows:
```sql
*************************** 1. row ***************************
Table: Test
Create Table: CREATE TABLE Test (
names varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
```
As everyone can see, the Test table uses `DEFAULT CHARSET=utf8mb3`, and the `names` column is using `CHARACTER SET utf8`.
However, the value I am trying to insert is a special value belonging to `utf8mb4 CHARACTER SET`, so I cannot insert it.

## Solution
Here I have 3 solutions as follows:

1. Change the configuration for the database
```sql
ALTER DATABASE [database_name] CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
```
2. Change the configuration for the table
```sql
ALTER TABLE [table_name] CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
3. Change the configuration for the column
```sql
ALTER TABLE [table_name] CHANGE [column_name] [column_name] VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Here, I will use method number 3 as follows
```sql
ALTER TABLE Test CHANGE names names VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
After that, I rerun the insert command statement and obtain the following result
```sql
INSERT INTO Test VALUES('Tiến');
-- Query OK, 1 row affected (0.00 sec)
```

## Conclusion
I hope this explanation was clear and easy to understand for you to follow through the process.