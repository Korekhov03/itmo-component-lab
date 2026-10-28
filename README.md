# Filesystem component

Author: Korekhov03. ISU: 507433. Group: K4213c.

Recursively counts regular files, nested directories and file sizes in bytes.
The root directory and symbolic links are excluded. Input is read only.
Only built-in Node.js modules are used. The container needs no network.

```sh
docker build -t ghcr.io/korekhov03/itmo-component-lab:507433 .
docker run --rm --network none --mount type=bind,source="$(pwd)/test-data",target=/data,readonly ghcr.io/korekhov03/itmo-component-lab:507433
```

Standard output: exactly `507433-FILES-DIRECTORIES-SIZE` followed by a newline.
Errors are sent to stderr and cause a nonzero exit status.
