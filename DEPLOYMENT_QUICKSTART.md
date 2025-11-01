# Quick Start - Auto Deploy

## Thiết lập nhanh trong 5 phút

### 1. Tạo SSH Key (chỉ làm 1 lần)

```bash
# Tạo SSH key
ssh-keygen -t rsa -b 4096 -f ~/.ssh/hostinger_deploy

# Copy public key
cat ~/.ssh/hostinger_deploy.pub
```

→ Paste public key vào Hostinger Panel (**SSH Access** → **Manage SSH Keys**)

### 2. Test SSH Connection

```bash
# Chạy script test
./scripts/test-ssh.sh

# Hoặc test thủ công
ssh -i ~/.ssh/hostinger_deploy -p 65002 u123456789@ssh.hostinger.com
```

### 3. Thêm GitHub Secrets

Vào GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Thêm 4 secrets:

| Name | Value | Ví dụ |
|------|-------|-------|
| `SSH_PRIVATE_KEY` | Nội dung file `~/.ssh/hostinger_deploy` | Toàn bộ private key |
| `REMOTE_HOST` | SSH host Hostinger | `ssh.hostinger.com` |
| `REMOTE_USER` | SSH username | `u123456789` |
| `REMOTE_TARGET` | Đường dẫn web folder | `/home/u123456789/domains/tuandata.com/public_html` |

**Lấy SSH_PRIVATE_KEY:**
```bash
cat ~/.ssh/hostinger_deploy
```

**Lấy REMOTE_TARGET:**
```bash
# SSH vào và chạy pwd
ssh -i ~/.ssh/hostinger_deploy -p 65002 u123456789@ssh.hostinger.com "pwd"
# Thêm /public_html vào cuối
```

### 4. Deploy!

```bash
# Push lên branch prod
git add .
git commit -m "Setup auto deployment"
git push origin prod
```

→ Check **Actions** tab trên GitHub để xem deployment progress

## Workflow hàng ngày

```bash
# Code trên branch main
git checkout main
# ... làm việc ...
git add .
git commit -m "Update content"
git push origin main

# Deploy lên production
git checkout prod
git merge main
git push origin prod  # ← Auto deploy!
```

## Troubleshooting nhanh

### ❌ "Permission denied (publickey)"
→ Kiểm tra public key đã thêm vào Hostinger chưa

### ❌ "Host key verification failed"
→ Chạy script test SSH để add host key

### ❌ "No such file or directory"
→ Kiểm tra lại `REMOTE_TARGET` path

## Need help?

Xem hướng dẫn chi tiết: [DEPLOYMENT.md](./DEPLOYMENT.md)
