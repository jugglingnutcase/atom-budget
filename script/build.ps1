Push-Location $PSscriptRoot\..\build
& npm install
& grunt download-atom-shell
Pop-Location
