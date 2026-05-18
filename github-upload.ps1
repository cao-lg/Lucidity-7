$ErrorActionPreference = "Continue"

Write-Host "=== GitHub Direct Upload Tool ===" -ForegroundColor Cyan

$token = "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"
$owner = "cao-lg"
$repo = "Lucidity-7"
$branch = "master"

$headers = @{
    "Authorization" = "token $token"
    "Accept" = "application/vnd.github.v3+json"
}

try {
    Write-Host "`n[1/4] Getting repository info..." -ForegroundColor Yellow
    $repoUrl = "https://api.github.com/repos/$owner/$repo"
    $repoInfo = Invoke-RestMethod -Uri $repoUrl -Headers $headers -Method GET
    Write-Host "Repository found: $($repoInfo.full_name)" -ForegroundColor Green
    
    Write-Host "`n[2/4] Getting current branch SHA..." -ForegroundColor Yellow
    $branchUrl = "https://api.github.com/repos/$owner/$repo/branches/$branch"
    $branchInfo = Invoke-RestMethod -Uri $branchUrl -Headers $headers -Method GET
    $latestSha = $branchInfo.commit.sha
    Write-Host "Latest commit SHA: $latestSha" -ForegroundColor Green
    
    Write-Host "`n[3/4] Creating commit..." -ForegroundColor Yellow
    $treeUrl = "https://api.github.com/repos/$owner/$repo/git/trees/$latestSha?recursive=1"
    $treeInfo = Invoke-RestMethod -Uri $treeUrl -Headers $headers -Method GET
    
    $baseTreeSha = $treeInfo.sha
    
    Write-Host "`n[4/4] Note: Direct API upload requires base64 encoding of all files" -ForegroundColor Yellow
    Write-Host "This method is complex. Recommended approach:" -ForegroundColor Cyan
    Write-Host "1. Use ZIP upload on GitHub web interface" -ForegroundColor White
    Write-Host "2. Or use GitHub CLI: gh repo clone" -ForegroundColor White
    Write-Host "3. Or temporarily disable VPN/proxy" -ForegroundColor White
    
} catch {
    Write-Host "`nError: $_" -ForegroundColor Red
    Write-Host "`nRecommended solution:" -ForegroundColor Yellow
    Write-Host "1. Download the ZIP file from e:\solo\lucidity-test.zip" -ForegroundColor White
    Write-Host "2. Go to https://github.com/cao-lg/Lucidity-7" -ForegroundColor White
    Write-Host "3. Click 'Add file' > 'Upload files'" -ForegroundColor White
    Write-Host "4. Drag and drop the unzipped files" -ForegroundColor White
}
