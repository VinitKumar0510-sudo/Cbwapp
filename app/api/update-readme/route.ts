import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, token, owner, repo } = await request.json();

    if (!username || !token || !owner || !repo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get current README content
    const getResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/README.md`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!getResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch README' }, { status: getResponse.status });
    }

    const fileData = await getResponse.json();
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    // Update content
    const updatedContent = `${currentContent}\n\nUpdated by ${username} on ${new Date().toISOString()}`;
    const encodedContent = Buffer.from(updatedContent).toString('base64');

    // Update README
    const updateResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/README.md`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Update README via app by ${username}`,
        content: encodedContent,
        sha: fileData.sha,
        committer: {
          name: username,
          email: `${username}@users.noreply.github.com`,
        },
      }),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      return NextResponse.json({ error: errorData.message || 'Failed to update README' }, { status: updateResponse.status });
    }

    const result = await updateResponse.json();
    return NextResponse.json({ 
      success: true, 
      commit: { sha: result.commit.sha },
      message: 'README updated successfully'
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}