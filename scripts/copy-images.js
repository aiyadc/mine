import fs from 'fs';
import path from 'path';

const srcPostsDir = path.join(process.cwd(), 'src', 'posts');
const publicPostsDir = path.join(process.cwd(), 'public', 'posts');

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'images') {
        copyDirectory(srcPath, destPath);
      }
    } else {
      // 复制文件
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  const postDirs = fs.readdirSync(srcPostsDir, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

  for (const postDir of postDirs) {
    const srcPostPath = path.join(srcPostsDir, postDir);
    const destPostPath = path.join(publicPostsDir, postDir);
    copyDirectory(srcPostPath, destPostPath);
  }

  console.log('Images copied successfully!');
} catch (error) {
  console.error('Error copying images:', error);
}
