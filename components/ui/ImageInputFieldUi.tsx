import React, { useState } from 'react';
import { MuiFileInput } from 'mui-file-input';
import { FormHelperText, FormControl, InputLabel, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { storage } from '../../../service/firebase/firebase-storage';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { ClearOutlined } from '@mui/icons-material';
import LoaderUi from './LoaderUi';

interface ImageInputFieldUiProps {
  disabled?: boolean;
  accept?: string;
  icon?: React.ReactNode;
  label?: string;
  error?: boolean;
  helperText?: any;
  onChange: (files: File[]) => void;
  onUploadComplete?: (urls: string[]) => void;
  maxFileSize?: number; // Optional: maximum file size in bytes
  allowedTypes?: string[]; // Optional: list of allowed file types
  multiple?: any; // Keep this as true, because the component expects it
}

const ImageInputFieldUi: React.FC<ImageInputFieldUiProps> = ({
  disabled = false,
  accept = 'image/*',
  icon = <ImageIcon />,
  label,
  error = false,
  helperText,
  onChange,
  onUploadComplete,
  maxFileSize = 5 * 1024 * 1024, // Default to 5MB
  allowedTypes = ['image/png', 'image/jpeg', 'image/gif'], // Default allowed types
  multiple = true, // This must be true because of the MuiFileInput requirement
}) => {
  const [value, setValue] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (newFiles: File[]) => {
    // Restrict selection to one file
    if (newFiles.length === 0) {
      clearUploadedFiles();
      onChange([]); // Clear out files if none selected
    } else {
      const file = newFiles[0]; // Take the first file if multiple are selected
      setValue([file]); // Set the selected file in the state
      onChange([file]); // Pass the selected file to the parent component
      setLoading(true); // Start loading
      uploadImages([file]); // Upload the selected file
    }
  };

  const uploadImages = async (files: File[]) => {
    const urls: string[] = [];
    for (const file of files) {
      const timestamp = new Date().getTime(); // Use timestamp for unique naming
      const storageRef = ref(storage, `images/${timestamp}-${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        urls.push(url);
        setUploadedUrls((prev) => [...prev, url]);
        console.log(`Uploaded: ${url}`);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    if (onUploadComplete) {
      onUploadComplete(urls);
    }
    setLoading(false); // Stop loading after upload
  };

  const clearUploadedFiles = async () => {
    setLoading(true); // Start loading for clearing
    for (const url of uploadedUrls) {
      const fileName = decodeURIComponent(url.split('/images').pop()?.split('?')[0] || '');
      const storageRef = ref(storage, `images/${fileName}`);
      try {
        await deleteObject(storageRef);
        console.log(`Deleted ${fileName} from Firebase Storage.`);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
    // Reset state after clearing files
    setUploadedUrls([]);
    setValue([]);
    onChange([]); // Clear out files
    setLoading(false); // Stop loading after clearing
  };

  const handleClear = () => {
    clearUploadedFiles();
  };

  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiFileInput
        value={value}
        placeholder="Insert file"
        size="small"
        variant="outlined"
        disabled={disabled}
        onChange={handleChange}
        multiple={multiple} // Keep as true because it's required
        InputProps={{
          inputProps: {
            accept,
          },
          startAdornment: icon,
          endAdornment: value.length > 0 && (
            <IconButton onClick={handleClear} size="small" disabled={disabled || loading}>
              {loading ? <LoaderUi size={18} /> : <ClearOutlined style={{ fontSize: 20 }} />}
            </IconButton>
          ),
        }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default ImageInputFieldUi;
