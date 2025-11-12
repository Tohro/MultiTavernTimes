@echo off
setlocal

REM Получаем путь к текущей папке
set "scriptRoot=%~dp0"

REM Путь к папке с изображениями
set "imageSource=%scriptRoot%Backend\MTT.API\wwwroot\news\images"

REM Путь к Docker volume
set "dockerVolume=C:\Docker\mtt_backend_api"

REM Проверка существования
if not exist "%imageSource%" (
    echo Папка с изображениями не найдена: %imageSource%
    exit /b 1
)

if not exist "%dockerVolume%" (
    echo Папка Docker volume не найдена: %dockerVolume%
    exit /b 1
)

REM Копирование
xcopy "%imageSource%\*" "%dockerVolume%\" /E /Y

echo Картинки скопированы из "%imageSource%" в "%dockerVolume%"