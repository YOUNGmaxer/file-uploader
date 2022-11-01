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

/** 上传文件块 */
const uploadFileChunk = async (fileName: string, chunk: FileChunk): Promise<void> => {
  try {
    const formData = new FormData()
    formData.append('chunk', chunk.chunk)
    formData.append('hash', chunk.hash)
    formData.append('fileName', fileName)

    const res = await fetch('http://localhost:8888/upload-chunk', {
      method: 'POST',
      body: formData
    })
    const data = await res.json();
    console.log(data)
  } catch (err) {
    console.error(err);
  }
}

export {
  createFileChunks,
  uploadFileChunk
}
