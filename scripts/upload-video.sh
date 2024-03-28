#!/bin/bash

# Script to upload video files to git repository
# Usage: ./upload-video.sh <video-file-path>

if [ $# -eq 0 ]; then
    echo "Usage: $0 <video-file-path>"
    echo "Example: $0 /path/to/your/tutorial.mp4"
    exit 1
fi

VIDEO_FILE="$1"
VIDEO_NAME=$(basename "$VIDEO_FILE")

# Check if video file exists
if [ ! -f "$VIDEO_FILE" ]; then
    echo "Error: Video file '$VIDEO_FILE' not found!"
    exit 1
fi

# Copy video to public directory
echo "Copying video to public directory..."
cp "$VIDEO_FILE" "./public/$VIDEO_NAME"

# Check file size (warn if > 100MB)
FILE_SIZE=$(stat -f%z "./public/$VIDEO_NAME" 2>/dev/null || stat -c%s "./public/$VIDEO_NAME" 2>/dev/null)
if [ "$FILE_SIZE" -gt 104857600 ]; then
    echo "Warning: Video file is larger than 100MB. Consider using Git LFS or hosting externally."
fi

# Add to git
echo "Adding video to git..."
git add "./public/$VIDEO_NAME"

# Commit
echo "Committing video..."
git commit -m "Add tutorial video: $VIDEO_NAME"

echo "Video uploaded successfully!"
echo "File location: ./public/$VIDEO_NAME"
echo "Access URL: /$VIDEO_NAME"