@echo off
REM Jimfire Safaris - Deployment Preparation Script (Windows)
REM This script prepares your application for cPanel deployment

echo ================================================
echo Jimfire Safaris - Deployment Preparation
echo ================================================
echo.

REM Step 1: Clean previous build
echo [1/6] Cleaning previous build...
if exist "dist" (
    rmdir /s /q dist
    echo [OK] Previous build removed
) else (
    echo [INFO] No previous build found
)
echo.

REM Step 2: Install dependencies
echo [2/6] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b %errorlevel%
)
echo [OK] Dependencies installed
echo.

REM Step 3: Run linter (optional)
echo [3/6] Running linter...
call npm run lint
echo.

REM Step 4: Build for production
echo [4/6] Building for production...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed
    pause
    exit /b %errorlevel%
)
echo [OK] Production build complete
echo.

REM Step 5: Copy .htaccess to dist
echo [5/6] Copying .htaccess to dist folder...
if exist ".htaccess" (
    copy .htaccess dist\.htaccess >nul
    echo [OK] .htaccess copied to dist\
) else (
    echo [ERROR] .htaccess file not found!
    echo [INFO] Please ensure .htaccess exists in project root
)
echo.

REM Step 6: Show build summary
echo [6/6] Build Summary
echo ----------------------------------------
echo Build location: .\dist
echo.
echo Contents:
if exist "dist" (
    dir dist
) else (
    echo [ERROR] dist folder not created
    pause
    exit /b 1
)
echo.

REM Verify required files
echo Verifying required files...
set MISSING_FILES=0

if not exist "dist\index.html" (
    echo [ERROR] index.html missing
    set MISSING_FILES=1
) else (
    echo [OK] index.html present
)

if not exist "dist\assets" (
    echo [ERROR] assets folder missing
    set MISSING_FILES=1
) else (
    echo [OK] assets folder present
)

if not exist "dist\.htaccess" (
    echo [ERROR] .htaccess missing
    set MISSING_FILES=1
) else (
    echo [OK] .htaccess present
)

echo.

if %MISSING_FILES%==0 (
    echo ================================================
    echo [SUCCESS] Build preparation complete!
    echo ================================================
    echo.
    echo Next Steps:
    echo 1. Review DEPLOYMENT.md for detailed instructions
    echo 2. Login to your cPanel account
    echo 3. Navigate to File Manager -^> public_html
    echo 4. Upload ALL contents from the .\dist folder
    echo 5. Set file permissions (644 for files, 755 for folders^)
    echo 6. Visit your website to verify deployment
    echo.
    echo Ready to deploy from: .\dist
) else (
    echo ================================================
    echo [ERROR] Build preparation failed!
    echo ================================================
    echo.
    echo Some required files are missing.
    echo Please check the errors above and try again.
    pause
    exit /b 1
)

echo.
pause
