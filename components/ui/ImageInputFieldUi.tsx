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
  helperText?: string;
  onChange: (files: File[]) => void;
  onUploadComplete?: (urls: string[]) => void;
  maxFileSize?: number; // Optional: maximum file size in bytes
  allowedTypes?: string[]; // Optional: list of allowed file types
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
}) => {
  const [value, setValue] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [helperTextState, setHelperTextState] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleChange = (newFiles: File[]) => {
    // Reset validation message
    setHelperTextState(undefined);

    // Validate files
    const validationErrors: string[] = [];

    newFiles.forEach((file) => {
      if (file.size > maxFileSize) {
        validationErrors.push(`${file.name} is too large. Maximum size is ${maxFileSize / 1024 / 1024} MB.`);
      }
      if (!allowedTypes.includes(file.type)) {
        validationErrors.push(`${file.name} is not an allowed file type. Allowed types are: ${allowedTypes.join(', ')}.`);
      }
    });

    if (validationErrors.length > 0) {
      setHelperTextState(validationErrors.join(' '));
      return; // Exit early if there are validation errors
    }

    if (newFiles.length === 0) {
      clearUploadedFiles();
      setValue([]);
      setUploadedUrls([]);
      setHelperTextState('Please select at least one file.');
      onChange([]);
    } else {
      setValue(newFiles);
      onChange(newFiles);
      setLoading(true); // Start loading
      uploadImages(newFiles);
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
        setHelperTextState('Upload failed. Please try again.');
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
    setHelperTextState('Please select at least one file.'); // Show message after clearing
    onChange([]);
    setLoading(false); // Stop loading after clearing
  };

  const handleClear = () => {
    clearUploadedFiles();
  };

  const handleBlur = () => {
    if (value.length === 0) {
      setHelperTextState('Please select at least one file.');
    }
  };

  return (
    <FormControl error={!!helperTextState} fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiFileInput
        value={value}
        placeholder="Insert files"
        size="small"
        variant="outlined"
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        multiple
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
      {helperTextState && <FormHelperText>{helperTextState}</FormHelperText>}
    </FormControl>
  );
};

export default ImageInputFieldUi;
