// global.d.ts

// Basic File System Access API type definitions
// These might need to be more comprehensive for full API usage,
// but are sufficient to address the showDirectoryPicker error.

interface FileSystemHandlePermissionDescriptor {
  mode?: 'read' | 'readwrite';
}

interface FileSystemHandle {
  readonly kind: 'file' | 'directory';
  readonly name: string;
  isSameEntry(other: FileSystemHandle): Promise<boolean>;
  queryPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
  requestPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
}

interface FileSystemGetFileOptions {
  create?: boolean;
}

interface FileSystemGetDirectoryOptions {
  create?: boolean;
}

interface FileSystemRemoveOptions {
  recursive?: boolean;
}

interface FileSystemCreateWritableOptions {
  keepExistingData?: boolean;
}

type FileSystemWriteChunkType = BufferSource | Blob | string | WriteParams;

interface WriteParams {
  type: "write" | "seek" | "truncate";
  data?: BufferSource | Blob | string;
  position?: number;
  size?: number;
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: FileSystemWriteChunkType): Promise<void>;
  seek(position: number): Promise<void>;
  truncate(size: number): Promise<void>;
  close(): Promise<void>; // Added close method
}


interface FileSystemFileHandle extends FileSystemHandle {
  readonly kind: 'file';
  getFile(): Promise<File>;
  createWritable(options?: FileSystemCreateWritableOptions): Promise<FileSystemWritableFileStream>;
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
  readonly kind: 'directory';
  getDirectoryHandle(name: string, options?: FileSystemGetDirectoryOptions): Promise<FileSystemDirectoryHandle>;
  getFileHandle(name: string, options?: FileSystemGetFileOptions): Promise<FileSystemFileHandle>;
  removeEntry(name: string, options?: FileSystemRemoveOptions): Promise<void>;
  resolve(possibleDescendant: FileSystemHandle): Promise<string[] | null>;
  keys(): AsyncIterableIterator<string>;
  values(): AsyncIterableIterator<FileSystemFileHandle | FileSystemDirectoryHandle>;
  entries(): AsyncIterableIterator<[string, FileSystemFileHandle | FileSystemDirectoryHandle]>;
  [Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemFileHandle | FileSystemDirectoryHandle]>;
}

type WellKnownDirectory =
  | "desktop"
  | "documents"
  | "downloads"
  | "music"
  | "pictures"
  | "videos";

interface DirectoryPickerOptions {
  id?: string;
  mode?: 'read' | 'readwrite';
  startIn?: WellKnownDirectory | FileSystemHandle;
}

// Augment the Window interface
declare global {
  interface Window {
    showDirectoryPicker(options?: DirectoryPickerOptions): Promise<FileSystemDirectoryHandle>;
    // Potentially add other File System Access API methods if needed in the future
    // showOpenFilePicker?(options?: OpenFilePickerOptions): Promise<FileSystemFileHandle[]>;
    // showSaveFilePicker?(options?: SaveFilePickerOptions): Promise<FileSystemFileHandle>;
  }
}

// Ensure this file is treated as a module if it doesn't have any imports/exports.
// This can be done by adding:
export {};