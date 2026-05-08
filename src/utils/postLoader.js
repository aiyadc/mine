const postDirectories = [
  '1-vscode-snippets',
  '2-react-guide',
  '3-web-architecture',
  '4-css-animation',
  '5-remote-work',
  '6-programming-journey',
  '7-concurrent-control'
];

export async function getAllPosts() {
  const posts = [];
  
  for (const dir of postDirectories) {
    try {
      const metaResponse = await fetch(`/src/posts/${dir}/meta.json`);
      const meta = await metaResponse.json();
      posts.push({
        ...meta,
        excerpt: meta.guideText,
        directory: dir
      });
    } catch (error) {
      console.error(`Failed to load post ${dir}:`, error);
    }
  }
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostById(id) {
  for (const dir of postDirectories) {
    try {
      const metaResponse = await fetch(`/src/posts/${dir}/meta.json`);
      const meta = await metaResponse.json();
      
      if (meta.id === parseInt(id)) {
        const contentResponse = await fetch(`/src/posts/${dir}/content.md`);
        const content = await contentResponse.text();
        
        return {
          ...meta,
          excerpt: meta.guideText,
          content: content,
          directory: dir
        };
      }
    } catch (error) {
      console.error(`Failed to load post ${dir}:`, error);
    }
  }
  return null;
}
