#!/bin/bash

# Jimfire Safaris - Deployment Preparation Script
# This script prepares your application for cPanel deployment

set -e

echo "================================================"
echo "Jimfire Safaris - Deployment Preparation"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Clean previous build
echo -e "${BLUE}[1/6] Cleaning previous build...${NC}"
if [ -d "dist" ]; then
    rm -rf dist
    echo -e "${GREEN}✓ Previous build removed${NC}"
else
    echo -e "${YELLOW}  No previous build found${NC}"
fi
echo ""

# Step 2: Install dependencies
echo -e "${BLUE}[2/6] Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 3: Run linter (optional, continue on error)
echo -e "${BLUE}[3/6] Running linter...${NC}"
npm run lint || echo -e "${YELLOW}  Linter warnings found (non-critical)${NC}"
echo ""

# Step 4: Build for production
echo -e "${BLUE}[4/6] Building for production...${NC}"
npm run build
echo -e "${GREEN}✓ Production build complete${NC}"
echo ""

# Step 5: Copy .htaccess to dist
echo -e "${BLUE}[5/6] Copying .htaccess to dist folder...${NC}"
if [ -f ".htaccess" ]; then
    cp .htaccess dist/
    echo -e "${GREEN}✓ .htaccess copied to dist/${NC}"
else
    echo -e "${RED}✗ .htaccess file not found!${NC}"
    echo -e "${YELLOW}  Please ensure .htaccess exists in project root${NC}"
fi
echo ""

# Step 6: Show build summary
echo -e "${BLUE}[6/6] Build Summary${NC}"
echo "----------------------------------------"
echo -e "Build location: ${GREEN}./dist${NC}"
echo ""
echo "Contents:"
if [ -d "dist" ]; then
    ls -lh dist/
    echo ""
    echo "Size:"
    du -sh dist/
else
    echo -e "${RED}✗ dist folder not created${NC}"
    exit 1
fi
echo ""

# Verify required files
echo -e "${BLUE}Verifying required files...${NC}"
MISSING_FILES=0

if [ ! -f "dist/index.html" ]; then
    echo -e "${RED}✗ index.html missing${NC}"
    MISSING_FILES=1
else
    echo -e "${GREEN}✓ index.html present${NC}"
fi

if [ ! -d "dist/assets" ]; then
    echo -e "${RED}✗ assets folder missing${NC}"
    MISSING_FILES=1
else
    echo -e "${GREEN}✓ assets folder present${NC}"
fi

if [ ! -f "dist/.htaccess" ]; then
    echo -e "${RED}✗ .htaccess missing${NC}"
    MISSING_FILES=1
else
    echo -e "${GREEN}✓ .htaccess present${NC}"
fi

echo ""

if [ $MISSING_FILES -eq 0 ]; then
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}✓ Build preparation complete!${NC}"
    echo -e "${GREEN}================================================${NC}"
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo "1. Review DEPLOYMENT.md for detailed instructions"
    echo "2. Login to your cPanel account"
    echo "3. Navigate to File Manager → public_html"
    echo "4. Upload ALL contents from the ./dist folder"
    echo "5. Set file permissions (644 for files, 755 for folders)"
    echo "6. Visit your website to verify deployment"
    echo ""
    echo -e "${BLUE}Ready to deploy from: ./dist${NC}"
else
    echo -e "${RED}================================================${NC}"
    echo -e "${RED}✗ Build preparation failed!${NC}"
    echo -e "${RED}================================================${NC}"
    echo ""
    echo -e "${YELLOW}Some required files are missing.${NC}"
    echo "Please check the errors above and try again."
    exit 1
fi
