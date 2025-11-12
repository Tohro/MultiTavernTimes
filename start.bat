@echo off
REM Запускаем контейнер
docker-compose -f docker-compose.yml  up -d --build

REM Ждём, пока контейнер стартует (можно увеличить при необходимости)
timeout /t 5 >nul

REM Копируем изображения
call copy_images.bat