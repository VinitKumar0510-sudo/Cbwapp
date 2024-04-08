# Video Integration Guide

## Overview
This project now includes video integration with proper error handling and git upload capabilities.

## Components Added

### VideoPlayer Component
- Location: `components/VideoPlayer.tsx`
- Features: Loading states, error handling, responsive design
- Usage: `<VideoPlayer src="/tutorial.mp4" width={600} height={400} title="Tutorial" />`

### Upload Script
- Location: `scripts/upload-video.sh`
- Usage: `./scripts/upload-video.sh /path/to/your/video.mp4`
- Features: File size warnings, automatic git commit

## How to Add Videos

### Method 1: Using the Upload Script
```bash
./scripts/upload-video.sh /path/to/your/tutorial.mp4
```

### Method 2: Manual Upload
1. Copy your video file to `public/` directory
2. Add to git: `git add public/your-video.mp4`
3. Commit: `git commit -m "Add tutorial video"`

## Video Requirements
- Format: MP4 (recommended)
- Size: < 100MB (for git compatibility)
- Location: Must be in `public/` directory

## Integration Status
✅ VideoPlayer component created
✅ About page updated to use VideoPlayer
✅ Upload script created and made executable
✅ Error handling for missing videos
✅ Responsive design support

## Next Steps
1. Replace placeholder `tutorial.mp4` with actual video
2. Run upload script to commit video to git
3. Test video playback in browser