#!/bin/bash

set -euo pipefail

export firebase_project_id=${FIREBASE_PROJECT_ID:-demo-project}

cd /firebase/

data_dir=emulators

(
    firebase emulators:start \
        --import $data_dir \
        --project "$firebase_project_id" \
        --only functions,firestore,auth,database,hosting
) &
firebase_pid=$!

echo ":: ready"

:stop() {
    echo
    echo ":: stopping"
    firebase emulators:export --project "$firebase_project_id" -f $data_dir
}

trap :stop INT TERM

wait $firebase_pid