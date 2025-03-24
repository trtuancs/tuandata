---
title: "Các lỗi phổ biến khi lập trình Python"
author: Tuân Data
publishDate: 23 Mar 2025
updatedDate: 24 Mar 2025
description: Tìm hiểu thư mục __pycache__ trong Python, lý do nó được tạo ra, cách hoạt động và có nên xóa nó không. Giải thích chi tiết giúp bạn hiểu rõ hơn về Python 🚀
tags: [python]
# draft: true
# ogImage: /meta_imgs/tim-hieu-pycache.png
# coverImage:
#     src: "tim-hieu-pycache.png"
#     alt: "Tìm hiểu thư mục __pycache__ trong Python"
#! TODO
---
Chào các bạn, trong bài này Tuân sẽ chia sẻ đến các bạn các lỗi mà các lập trình viên Python thường mắc phải khi code các dự án Python.
Thật ra đây không phải lỗi xãy ra khi chúng ta chạy các script, mà các lỗi này xuất phát từ thói quen lập trình.
Chúng ta cùng tìm hiểu nhé.

## Dùng from module import *

🔹 Lỗi này còn được biết đến với cái tên __Wildcard import__. Có thể các bạn sẽ thấy tiện lợi khi code như vậy, nhưng sau đây là các vấn đề nếu không may thì bạn sẽ gặp phải:
- Khiến code không được tường minh và khó đọc cũng như hiểu nhanh. Từ đó làm cho việc maintain hơi phức tạp hơn. Ví dụ như đoạn code ngắn sau đây:
```python
from super_module import *
from another_module import *

handle_item(item) # Hàm này được define ở đâu ?
do_stuff() # Hàm này được define ở đâu ?
```
- Một vấn đề thứ 2 và cũng nguy hiểm hơn, đó là khi các module có trùng tên hàm thì sao ? làm sao biết được hàm đang thực thi sẽ là hàm của module nào ?. Ví dụ như đoạn code ngắn sau đây:
```python
from numpy import *
from math import *

result = sqrt(16) # Hàm sqrt được sử dụng là hàm sqrt của numpy hay của math ?
```

👉 Giải pháp ở đây là chúng ta nên import rõ ràng những gì chúng ta cần như đoạn code sau:
```python
from numpy import sqrt

result = sqrt(16)

# Hoặc sử dụng as để alias như này
import numpy as np

result = np.sqrt(16)
```

## Sử dụng tham số list=[]

🔹 Đây là một lỗi mà Tuân cũng từng mắc phải, và rất khó debug nếu chúng ta không để ý. Để rõ hơn về lỗi này, chúng ta cùng tìm hiểu ví dụ sau đây.

__Yêu cầu__: viết một hàm process, nhận vào tham số data có kiểu list và kết quả trả về của hàm là biến data đã append thêm giá trị 1.
```python
def process(data=[]):
    data.append(1)
    return data
```
Nếu chỉ nhìn sơ qua, thì có lẽ mọi người thấy hàm trên không xãy ra vấn đề gì đúng không ? Nhưng thật sự đây chính là nguồn cơ của những con _bug_ xuất hiện. Để rõ hơn thì các bạn thử chạy đoạn script sau và xem kết quả nhé:
```python
def process(data=[]):
    data.append(1)
    return data

print(process())  # [1]
print(process())  # [1, 1]
print(process())  # [1, 1, 1]
```
Lý do là tại vì tham số _data_ sử dụng trong hàm _process_ là một __mutable object__.

👉 Giải pháp ở đây là chúng ta nên sử dụng __None__ làm giá trị mặt định của tham số _data_, và khi đó hàm _process_ sẽ được khai báo như sau:
```python
def process(data=None):
    if data is None:
        data = []
    data.append(1)
    return data
```

## Sử dụng == None

Những ngày đầu lập trình Tuân cũng mắc lỗi này, đơn giản vì còn mơ hồ giữa phép __is__ và __==__. Đối với các kiểu dữ liệu bình thường, các bạn sử dụng phép so sánh __== None__ sẽ không phát hiện ra sự khác biệt mấy, cũng như code chạy sẽ không lỗi. Nhưng khi sử dụng với _array_ của __numpy__ hoặc _dataframe_ của __pandas__ thì bạn sẽ nhận ra.

Chúng ta cùng tìm hiểu đoạn code sau nhé:
```python
import numpy as np

def normalize(data=None):
    if data == None:
        return np.zeros(1)
    return (data - np.mean(data)) / np.std(data)
```

Trong đoạn code trên, _if_ kiểm tra __None__ sẽ đi kiểm tra các phần tử của _array_ có phải __None__ hay không chứ không phải kiểm tra biến _data_ có phải __None__ hay không.

👉 Giải pháp ở đây là chúng ta nên sử dụng __is None__ khi cần kiểm tra giá trị một biến có phải None hay không, chứ không nên sử dụng __== None__.

## Phần kết

💡 Tóm lại cả __\_\_pycache\_\___ là thư mục mà __Python__ sử dụng để lưu trữ các file _bytecode_, phục vụ cho tác vụ tiếp theo trong quá trình thực thi của __Python__.

### 🔗 Tài liệu tham khảo
- https://www.reddit.com/r/learnpython/comments/8zej2c/eli5_what_are_wildcard_imports_and_why_should_i/
- https://realpython.com/python-pycache/
- https://www.geeksforgeeks.org/python-virtual-machine/