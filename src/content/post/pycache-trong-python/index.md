---
title: "Tìm hiểu thư mục __pycache__ trong Python"
author: Tuân Data
publishDate: 20 Mar 2025
updatedDate: 21 Mar 2025
description: Tìm hiểu thư mục __pycache__ trong Python, lý do nó được tạo ra, cách hoạt động và có nên xóa nó không. Giải thích chi tiết giúp bạn hiểu rõ hơn về Python 🚀
tags: [python]
# draft: true
ogImage: /meta_imgs/tim-hieu-pycache.png
coverImage:
    src: "tim-hieu-pycache.png"
    alt: "Tìm hiểu thư mục __pycache__ trong Python"
#! TODO
---
Khi bạn chạy một chương trình __Python__, bạn có thể thấy một thư mục lạ xuất hiện trong project của mình có tên __\_\_pycache\_\___. Nếu bạn đã từng tự hỏi "Thư mục này là gì?", "Tại sao nó được tạo ra?", và "Có thể xóa nó không?", thì bài viết này Tuân sẽ giúp bạn giải đáp tất cả những thắc mắc đó.

## \_\_pycache\_\_ là gì?  

🔹 Thư mục __\_\_pycache\_\___ trong Python là nơi lưu trữ các file _bytecode_ đã được biên dịch của chương trình __Python__. Khi bạn chạy một file __.py__, __Python__ sẽ tạo một file _bytecode_ với đuôi file là __.pyc__.

Các file _bytecode_ này sẽ đươc chạy trong máy ảo __Python__ (__Python Virtual Machine__ - __PVM__ ) và tạo ra kết quả cuối cùng.

## \_\_pycache\_\_ sẽ được tạo lại khi nào?

🔹 Các file _bytecode_ (__.pyc__) trong thư mục \_\_pycache\_\_ chỉ được tạo lại khi source code của dự án thay đổi (nội dung code trong các file __.py__ thay đổi).

Vì vậy, nếu nội dung trong các file __.py__ không thay đổi, thì những lần chạy sau (lần thứ 2 trở đi) sẽ được thực thi nhanh hơn, vì không cần phải build lại các file _bytecode_ mà __PVM__ chỉ cần chạy các file đã được tạo trước đó.

## Có xoá được không ?

🔹 Như Tuân đã giải thích ở trên, thì chúng ta có thể xoá nó đi nhé!. Vì mỗi lần chạy một chương trình, Python sẽ kiểm tra đã có file _bytecode_ chưa? file _bytecode_ là mới hay cũ? từ đó xác định có nên build lại không.

## Có nên push lên cùng với source code không?

🔹 Một lỗi phổ biến mà các bạn sinh viên khi mới tham gia vào dự án mắc phải, đó là "push luôn __\_\_pycache\_\___ lên git cùng với source code". Thật sự thì nó không ảnh hưởng gì đến project cả, nhưng lúc review commit sẽ rất rối.

👉 Vậy nên lời khuyên của mình là nên để nó trong _gitignore_ các bạn nhé, không nên push lên làm gì cả.

## Phần kết

💡 Tóm lại cả __\_\_pycache\_\___ là thư mục mà __Python__ sử dụng để lưu trữ các file _bytecode_, phục vụ cho tác vụ tiếp theo trong quá trình thực thi của __Python__.

### 🔗 Tài liệu tham khảo
- https://www.youtube.com/watch?v=H8NPpVNSYls&ab_channel=upGrad
- https://realpython.com/python-pycache/
- https://www.geeksforgeeks.org/python-virtual-machine/