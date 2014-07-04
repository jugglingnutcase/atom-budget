# Build the atom shell
Push-Location $PSscriptRoot\..\build
& npm install
& grunt download-atom-shell
Pop-Location

# Build the app
Push-Location $PSscriptRoot\..\budget
& npm install
& bower install
Pop-Location

