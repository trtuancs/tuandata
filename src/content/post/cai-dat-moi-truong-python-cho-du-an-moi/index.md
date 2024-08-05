---
title: Cài đặt môi trường Python cho dự án mới (systemd)
author: Tuân Data
publishDate: 30 Jul 2024
updatedDate: 30 Jul 2024
description: Chào mọi người, trong bài viết này Tuân sẽ chia sẻ đến mọi người về "Cách cài đặt Python cho một dự án mới" trong môi trường systemd.
tags: [data engineering, Python, Python Virtual Environment]
# draft: true
# ogImage: /delp2024.png
# coverImage:
#     # src: "delp2024.png"
#     alt: "Data Engineering Learning Path 2024"
#! TODO
---
## Giới thiệu
Chào mọi người, mình là Tuân đây. Trong bài viết này Tuân sẽ chia sẻ đến mọi người về `Cách cài đặt môi trường Python cho một dự án mới`, đây là một trong những kiến thức rất quan trọng đối với một Data Engineer, mọi người cùng tham khảo nhé!.

---
## Mô tả vấn đề
Thông thường khi bắt đầu setup một project mới, công việc đầu tiên của Tuân sẽ phải xác định xem project này nên sử dụng version nào của Python, và thường sẽ là version mới nhất của Python được stable nếu không có các yêu cầu khác cũng như các ràng buộc liên quan project.

Tuân thường kiểm tra version của Python tại trang web [Version Python](https://devguide.python.org/versions/), và ở thời điểm hiện tại thì version mới nhất Python được stable là 3.11.9 và thời điểm end of life của nó cũng còn khá xa (2027-10).

Sau khi đã chọn được version Python phù hợp, Tuân sẽ đi kiểm tra version Python hiện tại trên server có đúng version chưa? Nếu đúng như version trên thì không cần phải cài thêm cũng như setup version, nếu chưa thì phải setup đúng version đã chọn (thông thường sẽ là chưa). Chúng ta sẽ kiểm tra bằng cách chạy câu lệnh sau nhé:

```bash title="root@server"
python3 --version
```

Nếu server bạn sử dụng là Ubuntu 20.04 thì kết quả thường sẽ như sau:

```bash title="root@server"
Python 3.8.x
```

Nếu server bạn sử dụng là Ubuntu 22.04 thì kết quả thường sẽ như sau:

```bash title="root@server"
Python 3.10.x
```

Nếu server bạn sử dụng là CentOS 7 hoặc 8 thì kết quả cũng không khả quan hơn (vì CentOS sẽ update các module package chậm hơn nữa).

Để thực hiện việc cài đặt version Python mong muốn, chúng ta sẽ thực hiện các bước sau nhé.

---
## Các bước cài đặt Python
### 1. Cập nhật các package

```bash title="root@server"
sudo apt update
```

### 2. Cài đặt các package cần thiết

```bash title="root@server"
sudo apt install -y build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev
```

### 3. Tải source code Python 3.11.9

```bash title="root@server"
wget https://www.python.org/ftp/python/3.11.9/Python-3.11.9.tgz
```

### 4. Giải nén source code

```bash title="root@server"
tar -xf Python-3.11.9.tgz
```

### 5. Di chuyển đến thư mục source code

```bash title="root@server"
cd Python-3.11.9
```

### 6. Chạy câu lệnh build các configuration

```bash title="root@server"
./configure --enable-optimizations --prefix=/usr/local
```

### 7. Build Python

```bash title="root@server"
make -j $(nproc)
```

### 8. Cài đặt Python

```bash title="root@server"
sudo make altinstall
```

### 9. Kiểm tra sau khi cài đặt

```bash title="root@server"
python3.11 --version
```

Tới bước này thì mọi người đã cài đặt xong Python 3.11.9 rồi, nhưng để sử dụng thì mọi người phải gõ `python3.11` khi làm việc. Tuân thì thích chỉnh chu hơn, nên các bước sau, Tuân sẽ chuyển câu lệnh từ `python3.11` sang `python3` và tiến hành xoá version cũ.

### 10. Chuyển câu lệnh python3.11 sang python3

```bash title="root@server"
sudo ln -sf /usr/local/bin/python3.11 /usr/bin/python3 ;
sudo update-alternatives --install /usr/bin/python3 python3 /usr/local/bin/python3.11 1
sudo update-alternatives --set python3 /usr/local/bin/python3.11
```

Sau khi hoàn thành xong bước này, thì mọi người có thể sử dụng `python3` bình thường rồi nhé.

### 11. Xoá version cũ

Ở đây version cũ của Tuân là Python 3.10 nên Tuân sẽ chạy câu lệnh sau nhé (nếu version của mọi người khác thì sửa lại cho phù hợp).

```bash title="root@server"
sudo apt remove python3.10
sudo apt autoremove
```
### 12. Cài đặt pip3

```bash title="root@server"
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
```

Ok, tới đây là mọi người có thể sử dụng Python với version mới như bình thường rồi nhé.

Nhưng mà để làm việc với một Project chúng ta sẽ cần phải tạo một môi trường ảo cho project (Virtual Environment).

Mọi người thực hiện các bước sau để tạo Virtual Environment.

---
## Các bước tạo Virtual Environment
### 1. Cài đặt venv module

```bash title="root@server"
sudo apt install python3-venv
```

### 2. Tạo môi trường

```bash title="root@server"
python3 -m venv project-env
```

### 3. Active môi trường

```bash title="root@server"
source project-env/bin/activate
```

Bây giờ mọi người đã có thể cài đặt các thư viện phục vụ cho project bằng cách 4 hoặc 5 như sau:

### 4. Cài đặt thư viện bằng câu lệnh

```bash title="root@server"
pip3 install package_name
```

### 5. Cài đặt thư viện từ file requirements.txt

```bash title="root@server"
pip3 install -r requirements.txt
```

### 6. Deactive môi trường

```bash title="root@server"
deactivate
```

## Kết
Trên đây là các bước để setup một môi trường Python cho một Project mới. Tuân hi vọng bài viết này sẽ thật sự hữu ích với mọi người.

Và cuối cùng Tuân xin cảm ơn các bạn đã tin tưởng Tuân và dành thời gian để đọc hết các nội dung ở trên. Nếu các bạn thấy bài viết này của Tuân hữu ích, thì hãy giúp Tuân chia sẻ đến những bạn đang cần nó nhé.