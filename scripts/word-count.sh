#!/bin/bash
# word-count.sh — Conta parole e caratteri per ogni file markdown del progetto.
# Utile per controllare i limiti dei form application.
#
# USO:
#   ./scripts/word-count.sh                # tutti i file
#   ./scripts/word-count.sh 02-application # solo una cartella
#   ./scripts/word-count.sh file.md        # un solo file

set -e

TARGET="${1:-.}"

if [ -f "$TARGET" ]; then
    FILES="$TARGET"
elif [ -d "$TARGET" ]; then
    FILES=$(find "$TARGET" -type f -name "*.md" | sort)
else
    echo "Errore: '$TARGET' non è file né cartella" >&2
    exit 1
fi

printf "%-60s %10s %10s\n" "FILE" "PAROLE" "CARATTERI"
printf "%-60s %10s %10s\n" "----" "------" "---------"

TOTAL_WORDS=0
TOTAL_CHARS=0

for f in $FILES; do
    WORDS=$(wc -w < "$f" | tr -d ' ')
    CHARS=$(wc -m < "$f" | tr -d ' ')
    TOTAL_WORDS=$((TOTAL_WORDS + WORDS))
    TOTAL_CHARS=$((TOTAL_CHARS + CHARS))
    SHORT_NAME=$(echo "$f" | sed 's|^\./||' | cut -c1-58)
    printf "%-60s %10s %10s\n" "$SHORT_NAME" "$WORDS" "$CHARS"
done

printf "%-60s %10s %10s\n" "----" "------" "---------"
printf "%-60s %10s %10s\n" "TOTALE" "$TOTAL_WORDS" "$TOTAL_CHARS"
