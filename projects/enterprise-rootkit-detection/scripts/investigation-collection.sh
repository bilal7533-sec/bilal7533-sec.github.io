#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# SOC INVESTIGATION COLLECTION
# Collects defensive host telemetry into a timestamped folder.
# Do not collect credentials or private key contents.
# ============================================================

OUT="/var/log/security/investigation-$(date +%Y%m%d-%H%M%S)"
sudo mkdir -p "$OUT"

{
    echo "HOST=$(hostname)"
    echo "TIME=$(date -Is)"
} | sudo tee "$OUT/context.txt" >/dev/null

sudo grep -Ei "Accepted|Failed|Invalid" /var/log/auth.log 2>/dev/null | sudo tee "$OUT/ssh-auth.log" >/dev/null || true
sudo grep -i sudo /var/log/auth.log 2>/dev/null | sudo tee "$OUT/sudo.log" >/dev/null || true
sudo last -ai | sudo tee "$OUT/last.log" >/dev/null
sudo who | sudo tee "$OUT/who.log" >/dev/null
sudo ps auxf | sudo tee "$OUT/process-tree.log" >/dev/null
sudo pstree -ap | sudo tee "$OUT/pstree.log" >/dev/null
sudo ss -lntup | sudo tee "$OUT/listening-sockets.log" >/dev/null
sudo systemctl list-unit-files --state=enabled | sudo tee "$OUT/enabled-services.log" >/dev/null

sudo find /etc /usr/local /opt -xdev -type f -mtime -1 -ls 2>/dev/null     | sudo tee "$OUT/recently-modified-files.log" >/dev/null

sudo find /home /root -name authorized_keys -type f -exec ls -l {} \; 2>/dev/null     | sudo tee "$OUT/ssh-key-locations.log" >/dev/null

sudo chmod -R go-rwx "$OUT"

echo "[+] Investigation evidence collected in $OUT"
