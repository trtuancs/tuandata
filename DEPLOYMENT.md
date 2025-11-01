# Hướng dẫn Auto Deploy lên Hostinger

## Tổng quan

Workflow này sẽ tự động build và deploy website lên Hostinger mỗi khi bạn push code lên branch `prod`.

## Bước 1: Lấy thông tin SSH từ Hostinger

### 1.1. Đăng nhập Hostinger

1. Truy cập [Hostinger Panel](https://hpanel.hostinger.com)
2. Đăng nhập với tài khoản của bạn

### 1.2. Lấy SSH credentials

1. Vào **Hosting** → Chọn website của bạn
2. Tìm mục **SSH Access** hoặc **Advanced** → **SSH Access**
3. Ghi lại các thông tin:
   - **SSH Host**: Thường là `ssh.hostinger.com` hoặc IP server
   - **SSH Port**: Mặc định là `22` hoặc `65002` (tùy gói hosting)
   - **SSH Username**: Username SSH của bạn (ví dụ: `u123456789`)
   - **Website Path**: Đường dẫn tới thư mục web (ví dụ: `/home/u123456789/domains/tuandata.com/public_html`)

### 1.3. Tạo SSH Key (nếu chưa có)

**Trên máy local của bạn:**

```bash
# Tạo SSH key mới
ssh-keygen -t rsa -b 4096 -C "your-email@example.com" -f ~/.ssh/hostinger_deploy

# Nhấn Enter để bỏ qua passphrase (hoặc đặt passphrase nếu muốn)
```

**Copy public key lên Hostinger:**

1. Copy nội dung file public key:
   ```bash
   cat ~/.ssh/hostinger_deploy.pub
   ```

2. Trên Hostinger Panel:
   - Vào **SSH Access** → **Manage SSH Keys**
   - Paste public key vào và lưu

**Lấy private key để thêm vào GitHub:**

```bash
cat ~/.ssh/hostinger_deploy
```

Copy toàn bộ nội dung (bao gồm `-----BEGIN OPENSSH PRIVATE KEY-----` và `-----END OPENSSH PRIVATE KEY-----`)

## Bước 2: Cấu hình GitHub Secrets

1. Truy cập repository GitHub của bạn
2. Vào **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Thêm các secrets sau:

### SSH_PRIVATE_KEY
- **Name**: `SSH_PRIVATE_KEY`
- **Value**: Paste private key từ bước 1.3 (toàn bộ nội dung file `~/.ssh/hostinger_deploy`)

### REMOTE_HOST
- **Name**: `REMOTE_HOST`
- **Value**: SSH host của Hostinger (ví dụ: `ssh.hostinger.com`)

### REMOTE_USER
- **Name**: `REMOTE_USER`
- **Value**: SSH username (ví dụ: `u123456789`)

### REMOTE_TARGET
- **Name**: `REMOTE_TARGET`
- **Value**: Đường dẫn thư mục web (ví dụ: `/home/u123456789/domains/tuandata.com/public_html`)

## Bước 3: Test kết nối SSH (Optional nhưng khuyến khích)

Trước khi deploy, test xem SSH có hoạt động không:

```bash
# Test SSH connection
ssh -i ~/.ssh/hostinger_deploy -p 65002 u123456789@ssh.hostinger.com

# Nếu kết nối thành công, bạn sẽ thấy terminal của Hostinger
# Gõ 'exit' để thoát
```

## Bước 4: Deploy lần đầu

### 4.1. Commit và push workflow file

```bash
git add .github/workflows/deploy.yml
git commit -m "Add auto deployment workflow"
git push origin prod
```

### 4.2. Kiểm tra deployment

1. Truy cập repository GitHub
2. Vào tab **Actions**
3. Bạn sẽ thấy workflow "Deploy to Hostinger" đang chạy
4. Click vào workflow để xem chi tiết logs

## Bước 5: Sử dụng hàng ngày

Từ giờ trở đi, mỗi khi bạn muốn deploy:

```bash
# Làm việc trên branch khác (ví dụ: main)
git checkout main
# ... code changes ...
git add .
git commit -m "Your changes"
git push origin main

# Khi sẵn sàng deploy lên production
git checkout prod
git merge main
git push origin prod  # → Tự động trigger deploy
```

## Troubleshooting

### Lỗi "Permission denied (publickey)"

**Nguyên nhân**: SSH key chưa được thêm vào Hostinger hoặc format sai

**Giải pháp**:
1. Kiểm tra lại public key đã được thêm vào Hostinger
2. Đảm bảo private key trong GitHub Secrets không có ký tự thừa/thiếu

### Lỗi "Host key verification failed"

**Nguyên nhân**: Lần đầu kết nối SSH cần verify host

**Giải pháp**: Thêm vào workflow file (đã có sẵn trong file deploy.yml):
```yaml
SCRIPT_BEFORE: |
  mkdir -p ~/.ssh
  ssh-keyscan -p 65002 ${{ secrets.REMOTE_HOST }} >> ~/.ssh/known_hosts
```

### Lỗi "No such file or directory"

**Nguyên nhân**: Đường dẫn REMOTE_TARGET sai

**Giải pháp**:
1. SSH vào Hostinger và kiểm tra đường dẫn chính xác
2. Cập nhật lại GitHub Secret `REMOTE_TARGET`

### Build failed

**Nguyên nhân**: Lỗi trong quá trình build

**Giải pháp**:
1. Check logs trong GitHub Actions
2. Test build local: `npm run build`
3. Fix lỗi và push lại

## Notes

- **Backup**: Luôn backup trước khi deploy lần đầu
- **Testing**: Test kỹ trên local trước khi push lên prod
- **Rollback**: Nếu có vấn đề, có thể revert commit và push lại
- **Branch strategy**: Nên dùng `main` cho development, `prod` cho production

## Monitoring

Sau mỗi lần deploy, kiểm tra:
1. Website có hoạt động bình thường
2. Không có lỗi 404 hoặc 500
3. Tất cả assets (CSS, JS, images) load đúng
