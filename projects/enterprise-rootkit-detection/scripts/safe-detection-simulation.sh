#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# SAFE DETECTION SIMULATION
# Creates harmless lab-only artifacts for FIM/investigation.
# This script does NOT install a rootkit or alter system binaries.
# ============================================================

ARTIFACT_DIR="/opt/lab-suspicious"

sudo mkdir -p "$ARTIFACT_DIR"

sudo touch "$ARTIFACT_DIR/.hidden-backdoor-test"
sudo touch "$ARTIFACT_DIR/.rootkit-test"

sudo tee /etc/security/lab-rootkit-test.conf >/dev/null <<'EOF'
# LAB ONLY
# Harmless simulated suspicious configuration artifact.
LAB_ROOTKIT_DETECTION_TEST=yes
EOF

sudo chmod 600 /etc/security/lab-rootkit-test.conf

echo "[+] Created controlled test artifacts:"
sudo find "$ARTIFACT_DIR" -maxdepth 1 -type f -ls
sudo ls -l /etc/security/lab-rootkit-test.conf
