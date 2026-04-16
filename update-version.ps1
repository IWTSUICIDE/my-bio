# Extract and increment version
$html = Get-Content "index.html" -Raw
$style = Get-Content "style.css" -Raw

# Get current version from <span id="app-version">X.Y.Z</span>
if ($html -match '<span id="app-version">([\d.]+)</span>') {
    $ver = $matches[1]
} else {
    Write-Error "Version not found in index.html"
    exit 1
}

# Increment patch version
$parts = $ver -split '\.'
$major = [int]$parts[0]
$minor = [int]$parts[1]
$patch = [int]$parts[2] + 1
$newver = "$major.$minor.$patch"

Write-Host "Current: $ver"
Write-Host "New: $newver"

# Update files
$html = $html -replace '<span id="app-version">' + [regex]::Escape($ver) + '</span>', '<span id="app-version">' + $newver + '</span>'
$style = $style -replace '--version: "' + [regex]::Escape($ver) + '"', '--version: "' + $newver + '"'
$html = $html -replace 'style.css\?v=' + [regex]::Escape($ver), 'style.css?v=' + $newver

Set-Content "index.html" $html -Encoding UTF8 -NoNewline
Set-Content "style.css" $style -Encoding UTF8 -NoNewline

Write-Host "✅ Files updated"