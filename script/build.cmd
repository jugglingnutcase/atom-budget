@echo off
pushd %~dp0
powershell.exe -NoProfile -ExecutionPolicy Unrestricted -File .\build.ps1
popd
@echo on
