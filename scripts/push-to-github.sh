#!/bin/sh
# Push code lên GitHub - chạy từ thư mục gốc project (ForexMAM)
# Cách 1: Đăng nhập GitHub CLI một lần:  gh auth login
#         Sau đó chạy:  ./scripts/push-to-github.sh
# Cách 2: Dùng Personal Access Token (không lưu token vào file):
#         GITHUB_TOKEN=ghp_xxxx ./scripts/push-to-github.sh
set -e
cd "$(dirname "$0")/.."
REPO="EddyShinee/ForexMAM"
BRANCH="main"
if [ -n "$GITHUB_TOKEN" ]; then
  git push "https://${GITHUB_TOKEN}@github.com/${REPO}.git" "$BRANCH"
else
  git push -u origin "$BRANCH"
fi
