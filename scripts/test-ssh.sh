#!/bin/bash

# Script để test SSH connection tới Hostinger
# Usage: ./scripts/test-ssh.sh

echo "========================================="
echo "Test SSH Connection to Hostinger"
echo "========================================="
echo ""

# Đọc thông tin từ user
read -p "SSH Host (ví dụ: ssh.hostinger.com): " SSH_HOST
read -p "SSH Port (thường là 65002): " SSH_PORT
read -p "SSH Username (ví dụ: u123456789): " SSH_USER
read -p "Path to SSH private key (ví dụ: ~/.ssh/hostinger_deploy): " SSH_KEY

# Expand path
SSH_KEY="${SSH_KEY/#\~/$HOME}"

echo ""
echo "========================================="
echo "Testing connection with:"
echo "Host: $SSH_HOST"
echo "Port: $SSH_PORT"
echo "User: $SSH_USER"
echo "Key: $SSH_KEY"
echo "========================================="
echo ""

# Test connection
ssh -i "$SSH_KEY" -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" "echo 'SSH Connection successful!' && pwd && ls -la"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SSH connection successful!"
    echo ""
    echo "Next steps:"
    echo "1. Ghi lại đường dẫn thư mục web (pwd output ở trên)"
    echo "2. Thêm các GitHub Secrets:"
    echo "   - SSH_PRIVATE_KEY: Nội dung file $SSH_KEY"
    echo "   - REMOTE_HOST: $SSH_HOST"
    echo "   - REMOTE_USER: $SSH_USER"
    echo "   - REMOTE_TARGET: <đường dẫn thư mục web>/public_html"
else
    echo ""
    echo "❌ SSH connection failed!"
    echo ""
    echo "Troubleshooting:"
    echo "1. Kiểm tra lại SSH credentials"
    echo "2. Đảm bảo public key đã được thêm vào Hostinger"
    echo "3. Kiểm tra firewall/security group"
fi
