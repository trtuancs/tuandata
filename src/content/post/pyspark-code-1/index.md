---
title: "PySparkCode #1: Using Datetime functions"
author: Tuan Data
publishDate: 7 Jan 2025
updatedDate: 7 Jan 2025
description: Getting started with applying datetime functions to dataframe in PySpark.
tags: [pysparkcode, python, pyspark]
draft: false
# ogImage: /social-card.png
coverImage:
    src: "pyspark-datetime.png"
    alt: "Illustration of PySpark Datatime Cover"
#! TODO
---
Datetime functions are essential when working with time-sensitive data, 
espectially in scenarios where data processing requires precise filtering or transformations based on dates and times.

In this post, We'll explore how to use PySpark's datetime functions to solve a real-world problem: **Detecting invalid transactions**.

## Problem Statement

Imagine you have a dataset containing transactions for the month of Septemper, with the following columns:
_transaction_id_ and _created_at_ (the timestamp of when the transaction was created). 

Your task is to filter out invalid transactions based on the following criteria:
- Transactions that occur outside of business hours (09:00-16:00, Monday-Friday).
- Transactions that take place on weekends (Saturday or Sunday).
- Transactions that occur on Vietnam's public holiday, specifically the 2nd of September.

## Code walkthrough

Let's break the solution into steps:

### 1. Initializing the spark session

We start by setting up a Spark session, which is the entry point for working with PySpark.

```python title="detect_invalid_transactions.py"
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("InvalidTransactions").getOrCreate()
```

### 2. Loading sample data

We define some sample transaction data with timestamps to mimic real-world transaction logs.

```python title="detect_invalid_transactions.py"
data = [
    (1051, '2024-09-01 10:15'),
    (1052, '2024-09-01 17:00'),
    (1053, '2024-09-02 10:00'),
    (1054, '2024-09-02 14:00'),
    (1055, '2024-09-03 08:59'),
    (1056, '2024-09-03 16:01'),
    (1057, '2024-09-04 09:00'),
    (1058, '2024-09-04 15:59'),
    (1059, '2024-09-05 12:00'),
    (1060, '2024-09-05 09:00'),
    (1061, '2024-09-06 10:00'),
    (1062, '2024-09-06 17:30'),
    (1063, '2024-09-07 12:00'),
    (1064, '2024-09-08 09:00'),
    (1065, '2024-09-09 08:59'),
    (1066, '2024-09-09 16:01'),
    (1067, '2024-09-02 10:00'),
    (1068, '2024-09-02 15:00'),
    (1069, '2024-09-10 09:00'),
    (1070, '2024-09-11 12:00'),
    (1071, '2024-09-12 08:59'),
    (1072, '2024-09-12 16:30'),
    (1073, '2024-09-13 09:00'),
    (1074, '2024-09-14 14:00'),
    (1075, '2024-09-15 17:00'),
    (1076, '2024-09-16 10:00'),
]

columns = ["transaction_id", "created_at"]
df = spark.createDataFrame(data, columns)
```

### 3. Filtering transactions in September 2024

We use _month()_ and _year()_ functions to filter transaction for September 2024.

```python title="detect_invalid_transactions.py"
from pyspark.sql.functions import col, month, year

df_september_2024 = df.filter((month(col('created_at')) == 9) & (year(col('created_at')) == 2024))
```

### 4. Identifying weekends

The _dayofweek()_ function help us detect weekends, where Saturday is day 7 and Sunday is day 1.

```python title="detect_invalid_transactions.py"
from pyspark.sql.functions import dayofweek

weekend_check = (dayofweek(col('created_at')).isin([1, 7]))
```

### 5. Checking business hours

We use _hour()_ and _minute()_ functions to identify transactions outside of 09:00-16:00.

```python title="detect_invalid_transactions.py"
from pyspark.sql.functions import hour, minute

outside_business_hours = (hour(col('created_at')) < 9) | (hour(col('created_at')) > 16) | \
                          ((hour(col('created_at')) == 16) & (minute(col('created_at')) > 0))
```

### 6. Marking public holiday

Transactions on 2nd September are flagged using the _dayofmonth()_ function.

```python title="detect_invalid_transactions.py"
from pyspark.sql.functions import dayofmonth

public_holiday_check = (dayofmonth(col('created_at')) == 2)
```

### 7. Combining conditions for invalid transactions

We combind the conditions using logical operators to detect invalid transactions.

```python title="detect_invalid_transactions.py"
invalid_transactions = df_september_2024.filter(weekend_check | outside_business_hours | public_holiday_check)
```

### 8. Displaying results

Finally, We select and display the IDs of invalid transactions.
```python title="detect_invalid_transactions.py"
invalid_transactions.select("transaction_id").show()
```

## Conclusion

In this post, we applied PySpark's datetime functions to address a specific real-world problem.
I hope that through this post, you have become familiar with the various functions for handling datetime data in PySpark.

This is part of a series of posts sharing code examples using PySpark for data processing #PySparkCode.