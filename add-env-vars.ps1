# PowerShell Script to Add Environment Variables to Vercel
# Save this file and run it, or copy-paste commands one by one

Write-Host "Adding Environment Variables to Vercel..." -ForegroundColor Green
Write-Host ""

# Read from .env.development file
if (Test-Path ".env.development") {
    Write-Host "Found .env.development file" -ForegroundColor Green
    
    # Parse .env.development
    $envContent = Get-Content ".env.development"
    $mongoUri = ($envContent | Select-String "MONGODB_URI=").ToString().Split("=", 2)[1]
    $jwtSecret = ($envContent | Select-String "JWT_SECRET=").ToString().Split("=", 2)[1]
    
    Write-Host ""
    Write-Host "Environment Variables to Add:" -ForegroundColor Yellow
    Write-Host "1. MONGODB_URI (found in .env.development)"
    Write-Host "2. JWT_SECRET (found in .env.development)"
    Write-Host "3. JWT_SECRET_EXPIRY = 7d"
    Write-Host "4. NODE_ENV = production"
    Write-Host "5. FRONTEND_URL = https://react-mini-ecommerce-rose.vercel.app"
    Write-Host ""
    
    $confirm = Read-Host "Do you want to add these variables to Vercel? (y/n)"
    
    if ($confirm -eq 'y' -or $confirm -eq 'Y') {
        Write-Host ""
        Write-Host "Adding MONGODB_URI..." -ForegroundColor Cyan
        echo $mongoUri | vercel env add MONGODB_URI production
        
        Write-Host "Adding JWT_SECRET..." -ForegroundColor Cyan
        echo $jwtSecret | vercel env add JWT_SECRET production
        
        Write-Host "Adding JWT_SECRET_EXPIRY..." -ForegroundColor Cyan
        echo "7d" | vercel env add JWT_SECRET_EXPIRY production
        
        Write-Host "Adding NODE_ENV..." -ForegroundColor Cyan
        echo "production" | vercel env add NODE_ENV production
        
        Write-Host "Adding FRONTEND_URL..." -ForegroundColor Cyan
        echo "https://react-mini-ecommerce-rose.vercel.app" | vercel env add FRONTEND_URL production
        
        Write-Host ""
        Write-Host "All environment variables added!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Ready to deploy to production!" -ForegroundColor Green
        Write-Host "Run: vercel --prod" -ForegroundColor Yellow
    }
} else {
    Write-Host ".env.development file not found!" -ForegroundColor Red
    Write-Host "Please add environment variables manually using Vercel Dashboard"
    $dashboardUrl = "https://vercel.com/egzziwd-8640s-projects/react-mini-ecommerce/settings/environment-variables"
    Write-Host "Visit: $dashboardUrl"
}
