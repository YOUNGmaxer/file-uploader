interface FileChunk {
  chunk: Blob;
  hash: string;
}

/** 文件块大小 */
const CHUNK_SIZE = 5 * 1024 * 1024

/** 生成文件分片 */
const createFileChunks = (largeFile: File): FileChunk[] => {
  const fileChunks: FileChunk[] = []
  let curSize = 0
  let chunkIndex = 0

  while (curSize < largeFile.size) {
    fileChunks.push({
      chunk: largeFile.slice(curSize, CHUNK_SIZE),
      hash: `${largeFile.name}-${chunkIndex}`
    })
    curSize += CHUNK_SIZE
    chunkIndex++
  }

  return fileChunks
}

export {
  createFileChunks
}
