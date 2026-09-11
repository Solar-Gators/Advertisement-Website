# Solar Gators website helper.
# The numbered .bat files in this folder run this script - double-click those, not this file.
# Every step below is also written out by hand in WEBSITE-EDITING-GUIDE.md ("Doing it by hand"),
# in case a script doesn't work on your computer.
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('setup', 'preview', 'new-change', 'upload')]
    [string]$Action
)

$RepoUrl    = 'https://github.com/Solar-Gators/Advertisement-Website.git'
$RepoWeb    = 'https://github.com/Solar-Gators/Advertisement-Website'
$MainBranch = 'master'
# npm rewrites these on some computers; they are never part of a website edit
$LockFiles  = @('package-lock.json', 'yarn.lock')
# Where "1 - First Time Setup" puts the website when run from a downloaded ZIP (kept out of OneDrive on purpose)
$DefaultFolder = Join-Path $env:USERPROFILE 'SolarGators\Advertisement-Website'
if ($env:SG_WEBSITE_FOLDER) { $DefaultFolder = $env:SG_WEBSITE_FOLDER }

$RepoRoot = Split-Path $PSScriptRoot -Parent

# Pick up programs installed after this window's parent started (e.g. Git or Node.js installed a minute ago)
$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')


# OUTPUT HELPERS -----------------------------
function Say([string]$Text)  { Write-Host $Text }
function Step([string]$Text) { Write-Host ''; Write-Host "==> $Text" -ForegroundColor Cyan }
function Good([string]$Text) { Write-Host $Text -ForegroundColor Green }
function Note([string]$Text) { Write-Host $Text -ForegroundColor Yellow }

function Stop-WithProblem([string]$Text) {
    Write-Host ''
    Write-Host "PROBLEM: $Text" -ForegroundColor Red
    Write-Host 'Nothing on the live website was changed. See "Troubleshooting" in WEBSITE-EDITING-GUIDE.md, or ask a senior member for help.'
    exit 1
}

# Opens a web page or folder. SG_WEBSITE_TEST is only set when testing these scripts.
function Open-Thing([string]$Target) {
    if ($env:SG_WEBSITE_TEST) { Say "(test mode: would open $Target)" } else { Start-Process $Target }
}

function Read-Answer([string]$Prompt) { "$(Read-Host $Prompt)".Trim() }


# CHECKS -----------------------------
function Assert-Installed([string]$Command, [string]$Name, [string]$DownloadUrl) {
    if (Get-Command $Command -ErrorAction SilentlyContinue) { return }
    Note "$Name is not installed on this computer. Opening its download page..."
    Open-Thing $DownloadUrl
    Stop-WithProblem "Install $Name (accept all the default options), then double-click this file again. If it still says this, restart your computer."
}

function Test-WebsiteFolder([string]$Folder) {
    (Test-Path (Join-Path $Folder '.git')) -and (Test-Path (Join-Path $Folder 'package.json'))
}

function Enter-Website {
    if (-not (Test-WebsiteFolder $RepoRoot)) {
        Stop-WithProblem "This copy of the website is not set up yet. Double-click '1 - First Time Setup' first. It creates your website folder at $DefaultFolder - after that, use the numbered files in THAT folder's website-tools."
    }
    Set-Location $RepoRoot
}

function Install-Packages {
    # npm ci installs exactly what package-lock.json lists. It can still rewrite the old yarn.lock,
    # which is why the helpers never upload lock files and reset them before starting a new change.
    & npm.cmd ci --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { Stop-WithProblem 'Installing failed. Scroll up and look for red "ERR" lines to see why.' }
}


# GIT HELPERS -----------------------------
# Files that were edited, added or deleted and are not uploaded yet (ignoring npm's lock files)
function Get-PendingChanges {
    git status --porcelain --untracked-files=all | Where-Object { $_ -and ($LockFiles -notcontains $_.Substring(3).Trim('"')) }
}

function Show-Changes($Lines) {
    foreach ($line in $Lines) {
        $code = $line.Substring(0, 2)
        $kind = if ($code -match '\?|A') { 'new' } elseif ($code -match 'D') { 'deleted' } elseif ($code -match 'R') { 'renamed' } else { 'changed' }
        Say ('   {0,-8} {1}' -f $kind, $line.Substring(3).Trim('"'))
    }
}

# Turns "Update officers!" into "update-officers-0911" (month + day), adding -2, -3... if that name is taken
function New-BranchName([string]$Description) {
    $slug = ($Description.ToLower() -replace '[^a-z0-9]+', '-').Trim('-')
    if ($slug.Length -gt 40) { $slug = $slug.Substring(0, 40).Trim('-') }
    if (-not $slug) { $slug = 'website-update' }
    $base = "$slug-$(Get-Date -Format 'MMdd')"
    $name = $base
    $n = 2
    while (git branch --list $name) { $name = "$base-$n"; $n++ }
    return $name
}


# 1 - FIRST TIME SETUP -----------------------------
function Invoke-Setup {
    Step 'Checking that Git and Node.js are installed'
    Assert-Installed 'git'  'Git'     'https://git-scm.com/downloads/win'
    Assert-Installed 'node' 'Node.js' 'https://nodejs.org/en/download'
    Good 'Git and Node.js are installed.'

    Step 'Telling Git who you are'
    $name  = git config --global user.name
    $email = git config --global user.email
    if ($name -and $email) {
        Good "Already set: $name <$email>"
    } else {
        Say 'Type your GitHub username and the email address on your GitHub account, pressing Enter after each.'
        $name  = Read-Answer 'GitHub username'
        $email = Read-Answer 'Email'
        if (-not $name -or -not $email) { Stop-WithProblem 'A username and an email are both needed.' }
        git config --global user.name $name
        git config --global user.email $email
        Good "Saved: $name <$email>"
    }

    Step 'Getting the website files'
    if (Test-WebsiteFolder $RepoRoot) {
        $site = $RepoRoot
        Good "This folder is already set up: $site"
    } elseif (Test-WebsiteFolder $DefaultFolder) {
        $site = $DefaultFolder
        Good "Found your existing website folder: $site"
    } else {
        if (Test-Path $DefaultFolder) {
            Stop-WithProblem "A folder already exists at $DefaultFolder but it is incomplete (probably from a download that did not finish). Delete that folder, then double-click this file again."
        }
        Say "Downloading the website into $DefaultFolder ..."
        git clone $RepoUrl $DefaultFolder
        if ($LASTEXITCODE -ne 0) { Stop-WithProblem 'Could not download the website from GitHub. Check your internet connection and try again.' }
        $site = $DefaultFolder
    }
    Set-Location $site

    Step "Installing the website's building blocks (1-3 minutes - lots of text is normal)"
    Install-Packages

    Write-Host ''
    Good 'Setup finished!'
    Say "Your website folder is: $site"
    if (-not (Test-WebsiteFolder $RepoRoot)) {
        Note 'From now on, use the numbered files in the website-tools folder INSIDE your website folder, not this one.'
        Note 'You can delete the ZIP you downloaded and the folder you extracted. Opening your website folder now...'
        Open-Thing (Join-Path $site 'website-tools')
    }
    Say "Next: double-click '2 - Start New Change' before you edit anything."
}


# 2 - START NEW CHANGE -----------------------------
function Invoke-NewChange {
    Enter-Website
    Assert-Installed 'git' 'Git' 'https://git-scm.com/downloads/win'

    Step 'Checking for unfinished work'
    $pending = @(Get-PendingChanges)
    if ($pending.Count -gt 0) {
        Note 'You have edits that are not uploaded yet:'
        Show-Changes $pending
        Stop-WithProblem "Upload them first with '4 - Upload My Changes'. (To throw them away instead, see 'Throwing away edits' in the guide.)"
    }
    Good 'Nothing unfinished.'

    Step 'Getting the latest version of the website'
    git checkout -q -- $LockFiles
    git switch $MainBranch
    if ($LASTEXITCODE -ne 0) { Stop-WithProblem "Could not switch to the main version of the website ($MainBranch)." }
    $before = git rev-parse HEAD
    git pull --ff-only origin $MainBranch
    if ($LASTEXITCODE -ne 0) { Stop-WithProblem 'Could not download the latest version. Check your internet connection. If the message mentions "diverging" or "fast-forward", ask a senior member for help.' }
    if (git diff --name-only $before HEAD -- package-lock.json) {
        Step "The website's building blocks changed since last time. Updating them (1-3 minutes)"
        Install-Packages
    }

    Step 'Naming your change'
    $description = Read-Answer 'In a few words, what are you changing? (example: update officers)'
    $branch = New-BranchName $description
    git switch -c $branch
    if ($LASTEXITCODE -ne 0) { Stop-WithProblem "Could not start the change '$branch'." }

    Write-Host ''
    Good "Ready! Your change is called: $branch"
    Say 'Now:'
    Say "  1. Double-click '3 - Preview Website' to see the site on your computer."
    Say '  2. Make your edits (see "Common edits" in the guide). The preview updates every time you save.'
    Say "  3. When it looks right, double-click '4 - Upload My Changes'."
}


# 3 - PREVIEW WEBSITE -----------------------------
function Invoke-Preview {
    Enter-Website
    Assert-Installed 'node' 'Node.js' 'https://nodejs.org/en/download'
    if (-not (Test-Path 'node_modules')) {
        Step "Installing the website's building blocks first (1-3 minutes)"
        Install-Packages
    }

    Step 'Starting the preview'
    Say 'Your browser will open http://localhost:3000 in 30 seconds to 2 minutes.'
    Say 'Every time you save a file, the page in your browser updates by itself.'
    Say 'Lots of yellow warnings below are normal. "Failed to compile" in red means a file you edited has a mistake.'
    Note 'Leave this window open while you work. Close it when you are done.'
    & npm.cmd start
}


# 4 - UPLOAD MY CHANGES -----------------------------
function Invoke-Upload {
    Enter-Website
    Assert-Installed 'git' 'Git' 'https://git-scm.com/downloads/win'

    $branch  = git branch --show-current
    $pending = @(Get-PendingChanges)

    if ($branch -eq $MainBranch) {
        if ($pending.Count -eq 0) {
            Good 'There is nothing to upload - no files have been edited.'
            Say "Next time, double-click '2 - Start New Change' before editing."
            return
        }
        Note "Your edits are on the main version of the website ($MainBranch), so they go on a new change first."
        $description = Read-Answer 'In a few words, what did you change? (example: update officers)'
        $branch = New-BranchName $description
        git switch -c $branch
        if ($LASTEXITCODE -ne 0) { Stop-WithProblem "Could not start the change '$branch'." }
    }

    if ($pending.Count -gt 0) {
        Step 'These files will be uploaded:'
        Show-Changes $pending
        $answer = Read-Answer 'Upload all of these? Type Y and press Enter (anything else cancels)'
        if ($answer -notmatch '^(y|yes)$') {
            Note 'Cancelled - nothing was uploaded. Undo the edits you do not want, then run this again.'
            exit 0
        }
        $message = Read-Answer 'Describe your change in one sentence (example: Updated the 2026 officer list)'
        if (-not $message) { $message = 'Website update' }
        $message = $message.Replace('"', "'")

        git -c core.safecrlf=false add --all
        git reset -q -- $LockFiles
        git commit -q -m $message
        if ($LASTEXITCODE -ne 0) { Stop-WithProblem 'Could not save your edits.' }
        Good 'Edits saved on this computer.'
    } else {
        Say 'No new edits - checking for saved edits that were not uploaded yet.'
    }

    Step 'Uploading to GitHub'
    Say 'The first time, a window asks you to sign in to GitHub. Choose "Sign in with your browser" and use your own account.'
    git push -u origin $branch
    if ($LASTEXITCODE -ne 0) {
        Stop-WithProblem "Upload failed. If it says 'Permission denied' or '403', your GitHub account needs access to the Solar-Gators organization - ask a senior member to add you, then double-click this file again. Your edits are saved on this computer, so nothing is lost."
    }

    $prPage = "$RepoWeb/compare/$MainBranch...$($branch)?expand=1"
    Write-Host ''
    Good 'Uploaded!'
    Say 'LAST STEP - publish it. Your browser is opening this page:'
    Say "  $prPage"
    Say '  1. Click the green "Create pull request" button.'
    Say '  2. Wait 2-3 minutes for a green check mark (GitHub test-builds your change).'
    Say '  3. Click "Merge pull request", then "Confirm merge". The live site updates 3-5 minutes later.'
    Say '  (If the club has someone review website changes, send them that page instead of merging yourself.)'
    Open-Thing $prPage
}


switch ($Action) {
    'setup'      { Invoke-Setup }
    'new-change' { Invoke-NewChange }
    'preview'    { Invoke-Preview }
    'upload'     { Invoke-Upload }
}
