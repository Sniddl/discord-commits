#!/usr/bin/env bash

testDir="$(dirname "${BASH_SOURCE[0]}")"

if [ ! -e "$testDir/../secrets.env" ]; then
    echo "Please enter your webhook:"
    echo -n "> "
    read webhook
    echo "DISCORD_WEBHOOK=\"$webhook\"" > "$testDir/../secrets.env"
fi

for file in $(find "$testDir" -type f -iname "*test.sh"); do
    echo -n "[....] Test case: $file"

    temp_file=$(mktemp)
    ignore="$(bash $file --quiet 2>&1 > $temp_file)"
    exitcode="$?"

    echo -en "\033[1G\033[K"
    if [[ "$exitcode" == 0 ]]; then
        echo  "[SENT] Test case: $file"
    else
        echo  "[FAIL] Test case: $file"
        echo ""
        echo "================ FAIL =================="
        cat "$temp_file"
        echo "============== END FAIL ================="
        echo ""
    fi
    rm "$temp_file"
done

# ignore="$(bash tests/pass/simple/test.sh 2>&1 > output.txt)"

# echo $?
# echo $output

