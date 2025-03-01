---
title: "OpenMetadata - Triển khai trên Docker Compose"
author: Tuân Data
publishDate: 1 Mar 2025
updatedDate: 2 Mar 2025
description: Hướng dẫn triển khai OpenMetadata trên Docker Compose, khắc phục lỗi phổ biến và thiết lập nền tảng quản lý metadata mạnh mẽ chỉ với vài bước đơn giản! 🚀
tags: [data engineering, data catalog, openmetadata]
# draft: true
ogImage: /meta_imgs/openmetadata-docker-compose.png
coverImage:
    src: "openmetadata-docker-compose.png"
    alt: "Hình minh hoạ cho bài viết triển khai OpenMetadata trên Docker Compose"

---

Trong bài viết trước, chúng ta đã cùng nhau tìm hiểu các thành phần chính để OpenMetadata platform có thể hoạt động cũng như vai trò của chúng.
Nếu bạn nào chưa xem thì có thể xem tại đây nhé [__OpenMetadata - Tìm hiểu kiến trúc và cách hoạt động__](https://tuandata.com/blog/openmetadata-kien-truc-hoat-dong).

Trong bài này, chúng ta sẽ cùng nhau tìm hiểu cách để triển khai một OpenMetadata Platform trên nền tảng Docker Compose. Vào bài thôi nào.

## Chuẩn bị
- Docker và Docker Compose đã được cài đặt trên server (hoặc máy tính) của bạn.
- Resource tối thiểu: 6 Gb RAM, 4 CPUs và 30Gb bộ nhớ.

## Triển khai

### 1. Tải file Docker Compose
Đầu tiên mọi người cần tải file Docker Compose official của OpenMetadata từ đường dẫn sau: 
- https://github.com/open-metadata/OpenMetadata/releases/download/1.6.5-release/docker-compose.yml

### 2. Giải thích cách service
Trong file Docker Compose mọi người tải về sẽ có 5 services sau: 
- __mysql__: Ứng với phần __Database__ của platform.
- __elasticsearch__: Ứng với phần __Search index__ của platform.
- __execute-migrate-all__: Để đảm bảo __Database__ và __Search index__ đã được chạy đúng với yêu cầu nền tảng. Nếu lần đầu chạy, thì nó sẽ  khởi tạo các thông tin phù hợp cho __OpenMetadata Server__. Sau khi khởi chạy thành công, nó sẽ có status ```Exit 0```.
- __openmetadata-server__: Ứng với phần __OpenMetadata Server__ của platform.
- __ingestion__: Ứng với phần __Ingestion framework__ của platform và đang sử dụng __Airflow__.

> **📝 Ghi chú**
>
> Nếu các bạn muốn chạy phần __Database__ sử dụng __PostgreSQL__ thay vì __MySQL__, các bạn có thể tải file Docker Compose tại đây nhé: https://github.com/open-metadata/OpenMetadata/releases/download/1.6.5-release/docker-compose-postgres.yml

### 3. Khởi chạy file Docker Compose
Sau khi đã download file Docker Compose phù hợp về, chúng ta sẽ khởi chạy OpenMetadata Platform bằng câu lệnh sau nhé:

```bash title=tuanlt@10.10.1.1
docker-compose up -d
```

### 4. Fix các lỗi gặp phải
Ở đây Tuân sẽ chia sẻ các lỗi có thể gặp phải khi khởi chạy câu lệnh trên nhé. Hy vọng có thể giúp mọi người triển khai thành công.

#### 4.1 Lỗi version Docker Compose file
Vì file Docker Compose trên trang Github OpenMetadata Official đang để __version '3.9'__, nên nếu version docker-compose của bạn chỉ hỗ trợ __'2.2'__ hoặc __'3.3'__ bạn có thể sửa lại dòng version thành như sau:
```yml title=docker-compose.yml
version: "3"
```

#### 4.2 Lỗi __condition__ trong __depends_on__
Ví dụ __condition__ trong __depends_on__ của service __execute-migrate-all__:
```yml title=docker-compose.yml
depends_on:
      elasticsearch:
        condition: service_healthy
      mysql:
        condition: service_healthy
```
Rõ ràng với version docker-compose 3.3 thì nó sẽ không hiểu, vậy nên các bạn cần phải thay đổi lại như sau:
```yml title=docker-compose.yml
depends_on:
      - elasticsearch
      - postgresql
```
Tương tự cho các service khác có __condition__ nhé.

#### 4.3 Khởi chạy
Sau khi đã thay đổi các nội dung Tuân để cập ở trên, các bạn có thể khởi chạy bằng câu lệnh ở trên như sau:
```bash title=tuanlt@10.10.1.1
docker-compose up -d
```
Hoặc nếu muốn chắc ăn hơn, các bạn có thể khởi chạy từng service theo thứ tự như sau:

Service __mysql__:
```bash title=tuanlt@10.10.1.1
docker-compose up -d mysql
```

Service __elasticsearch__:
```bash title=tuanlt@10.10.1.1
docker-compose up -d elasticsearch
```

Sau khi đã chạy 2 service __mysql__ và __elasticsearch__, bạn hãy chờ trạng thái nó là ```Up (healthy)``` mới tiền hành chạy tiếp service __execute-migrate-all__ nhé:
```bash title=tuanlt@10.10.1.1
docker-compose up -d execute-migrate-all
```

Sau khi đã chạy service __execute-migrate-all__, bạn phải chờ cho status của nó là ```Exit 0```, rồi mới tiến hành chạy service __openmetadata-server__ nhé:
```bash title=tuanlt@10.10.1.1
docker-compose up -d openmetadata-server
```

Và cuối cùng là service __ingestion__:
```bash title=tuanlt@10.10.1.1
docker-compose up -d ingestioningestion
```

Nếu chạy thành công, bạn sẽ được một danh sách các service với các status như sau:
```bash title=tuanlt@10.10.1.1
[tuanlt@10.10.1.1:/opt/openmetadata]# docker-compose ps
           Name                         Command                  State                           Ports
---------------------------------------------------------------------------------------------------------------------------
execute_migrate_all          /bin/bash ./bootstrap/open ...   Exit 0
openmetadata_elasticsearch   /bin/tini -- /usr/local/bi ...   Up (healthy)   0.0.0.0:9200->9200/tcp, 0.0.0.0:9300->9300/tcp
openmetadata_ingestion       /bin/bash /opt/airflow/ing ...   Up             0.0.0.0:8080->8080/tcp
openmetadata_mysql           docker-entrypoint.sh --wor ...   Up (healthy)   0.0.0.0:5432->5432/tcp
openmetadata_server          /bin/bash /openmetadata-st ...   Up (healthy)   0.0.0.0:8585->8585/tcp, 0.0.0.0:8586->8586/tcp
```

## Trải nghiệm thành quả
Sau khi đã triển khai thành công, các bạn hãy truy cập vào đường dẫn sau để xem thành quả nhé:
- http://localhost:8585 (Nếu như các bạn triển khai trên máy tính cá nhân).
- http://ip_server:8585 (Nếu như các bạn triển khai trên server).

Sau khi truy cập trang web nền tảng OpenMetadata, các bạn sử dụng tài khoản sau để đăng nhập nhé:
- email: admin@open-metadata.org
- password: admin

## Phần kết
Vậy là chúng ta đã cùng nhau triển khai thành công OpenMetadata trên nền tảng Docker Compose! 🎉

Bằng cách thực hiện từng bước từ tải file Docker Compose, hiểu rõ các service trong hệ thống, khắc phục lỗi phổ biến và khởi chạy đúng thứ tự, bạn đã có thể thiết lập một nền tảng quản lý metadata mạnh mẽ và sẵn sàng để sử dụng.

Nếu bạn gặp bất kỳ lỗi nào trong quá trình cài đặt hoặc có thắc mắc, hãy tham gia vào cộng đồng Tuân Data để cùng thảo luận nhé! Đừng quên tiếp tục khám phá các tính năng của OpenMetadata và tùy chỉnh nó để phù hợp với nhu cầu của bạn. 🚀

👉 Hãy thử ngay và chia sẻ trải nghiệm của bạn!

### 🔗 Tài liệu tham khảo
- https://docs.open-metadata.org/latest/deployment/docker

Chúc bạn thành công! 💡