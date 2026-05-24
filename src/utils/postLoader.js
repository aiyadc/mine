const postDirectories = [
  '1-vscode-snippets',
  '7-concurrent-control',
  'audio-manager-streaming',
  'canvas-dpr',
  'easy-image-load',
  'konva-magnetic-snap',
  'npm-tips',
  'npx-guide',
  'vr-socket-reconnect'
];

export async function getAllPosts() {
  const fetchPromises = postDirectories.map(async (dir) => {
    try {
      const metaResponse = await fetch(`/posts/${dir}/meta.json`);
      const meta = await metaResponse.json();
      return {
        ...meta,
        excerpt: meta.guideText,
        directory: dir
      };
    } catch (error) {
      console.error(`Failed to load post ${dir}:`, error);
      return null;
    }
  });

  const results = await Promise.allSettled(fetchPromises);
  const posts = results
    .filter(result => result.status === 'fulfilled' && result.value !== null)
    .map(result => result.value);

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostById(id) {
  const fetchMetaPromises = postDirectories.map(async (dir) => {
    try {
      const metaResponse = await fetch(`/posts/${dir}/meta.json`);
      const meta = await metaResponse.json();
      return { ...meta, directory: dir };
    } catch (error) {
      console.error(`Failed to load post ${dir}:`, error);
      return null;
    }
  });

  const metaResults = await Promise.allSettled(fetchMetaPromises);
  const postMeta = metaResults
    .filter(result => result.status === 'fulfilled' && result.value !== null)
    .map(result => result.value)
    .find(meta => meta.id === parseInt(id));

  if (!postMeta) {
    return null;
  }

  try {
    const contentResponse = await fetch(`/posts/${postMeta.directory}/content.md`);
    const content = await contentResponse.text();
    return {
      ...postMeta,
      excerpt: postMeta.guideText,
      content: content
    };
  } catch (error) {
    console.error(`Failed to load content for ${postMeta.directory}:`, error);
    return null;
  }
}
