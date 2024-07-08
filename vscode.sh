#!/bin/sh
ABSPATH=$(cd "$(dirname "$0")"; pwd)
code "$ABSPATH" --extensions-dir="$ABSPATH/.vscodeprofile/exts" --user-data-dir="$ABSPATH/.vscodeprofile/data"