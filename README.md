# Vuln-Eye Code Scanner Plugin
## How to run the scanner server locally
- Clone the static analyzer repo - https://github.com/BhardwajArjit/static_analyzer
- After Cloning, go the folder and run 
``` bash
    docker build -t static_analyzer .
```
- After the docker image is generated successfully, run the following
``` bash
    docker run -it -p 8000:8000 --rm --name static static_analyzer
```

## How to run the VS Code Extension locally
- Clone this repo
- Run `npm i`
- After the installation is done, goto `Run` Tab > `Start Debugging`.
- A new VS Code window shall appear.
- Open the target file in the newly opened VS Code window.
- Hit `Ctrl + Shift + p`
- Type `Scan` and hit Enter.