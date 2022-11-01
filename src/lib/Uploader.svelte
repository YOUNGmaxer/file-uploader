<script lang="ts">
  import { createFileChunks } from "./uploader";

  let file = null
  let fileInputActive = false

  /** 点击时，获取选中的文件 */
  const handleFileChange = (e) => {
    const [_file] = e.target.files
    if (!_file) return
    file = _file
  }

  /** 拖拽时，获取选中的文件 */
  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    fileInputActive = false

    const [_file] = e.dataTransfer.files
    if (!_file) return
    file = _file
  }

  /** 文件拖拽进指定区域时 */
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    fileInputActive = true
  }

  /** 文件拖拽离开指定区域时 */
  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    fileInputActive = false
  }

  const handleUpload = () => {
    const fileChunks = createFileChunks(file)
  }
</script>


<div class="uploader-container">
  <input type="file" id="file" on:change={handleFileChange} />
  <label class="file-input" class:active={fileInputActive} for="file" on:dragover={handleDragOver} on:dragleave={handleDragLeave} on:drop={handleDrop}>{fileInputActive ? '松开确定' : '选择文件'}</label>

  <button class="upload-btn" on:click={handleUpload}>上传文件</button>
</div>

{#if file}
  <div class="file-list" title={file.name}>文件名: {file.name}</div>
{/if}

<style>
.uploader-container {
  display: flex;
  justify-content: space-between;
}

#file {
  width: 0;
  position: absolute;
}
.file-input {
  display: flex;
  width: 200px;
  height: 120px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: dashed 0.5px rebeccapurple;
}
.file-input.active {
  background-color: rgba(0, 0, 0, 0.4);
}

.upload-btn {
  background-color: orangered;
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.file-list {
  margin-top: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
