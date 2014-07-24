# Build the atom shell
Push-Location $PSscriptRoot\..\build
& npm install
& grunt download-atom-shell
Pop-Location

# Build the app
Push-Location $PSscriptRoot\..\budget

# Install app dependencies via apm and bower
& ..\build\node_modules\atom-package-manager\bin\apm.cmd install . --arch=ia32
& bower install
Pop-Location
