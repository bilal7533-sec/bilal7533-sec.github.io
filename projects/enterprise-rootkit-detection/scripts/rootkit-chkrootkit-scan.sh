#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Enterprise Rootkit Detection Lab
# Purpose: Repeatable chkrootkit scan with local evidence log
# Safety: Detection only. No malware/rootkit is installed.
# ============================================================

LOG_DIR="/var/log/security"
LOG_FILE="$LOG_DIR/chkrootkit.log"

mkdir -p "$LOG_DIR"
chmod 750 "$LOG_DIR"

{
    echo "============================================================"
    echo "CHKROOTKIT SCAN"
    echo "Host: $(hostname)"
    echo "Date: $(date -Is)"
    echo "============================================================"
    chkrootkit
    echo "============================================================"
    echo "SCAN COMPLETE"
    echo "============================================================"
} 2>&1 | tee -a "$LOG_FILE"

chmod 640 "$LOG_FILE"
echo "[+] Evidence written to $LOG_FILE"
