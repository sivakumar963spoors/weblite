
import { FileUploader } from "react-drag-drop-files";
import { List, ListItem, ListItemText, Typography, Paper ,CircularProgress, Autocomplete, TextField} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import SignatureCanvas from "react-signature-canvas";
const imageTypes = ["JPG", "PNG", "GIF"];
const documentTypes = ["PDF", "DOCX"];
const audioTypes = ["MP3", "WAV"];

export  function Drag() {
  const [image, setImage] = useState([]);
  const [document, setDocument] = useState([]);
  const [audio, setAudio] = useState([]);
  const [multiImages, setMultiImages] = useState([]);
  const [multiDocs, setMultiDocs] = useState([]);

  // Function to handle file selection (single or multiple)
  const handleChange = (setter, isMultiple = false) => (files) => {
    if (!files) return;

    let filesArray = Array.isArray(files) ? files : [files]; // Convert to array
    filesArray = filesArray.filter((file) => file instanceof File); // Ensure valid files

    setter(isMultiple ? (prev) => [...prev, ...filesArray] : filesArray);
  };

  // Function to generate file URLs
  const createDownloadLink = (file) => (file ? URL.createObjectURL(file) : "#");

  return (
    <Paper sx={{ margin: "auto", mt: 4, padding: 3 }}>
      {/* Single Image Upload */}
      <Typography>Upload a Single Image</Typography>
      <FileUploader handleChange={handleChange(setImage)} name="image" types={imageTypes} label="Drag & drop or click here to upload" uploadedLabel="Uploaded successfully!" />
      <List>
        {image.map((file, index) => (
          <ListItem key={index}>
            <ListItemText>
              <a href={createDownloadLink(file)} download={file.name}>
                {file.name}
              </a>
            </ListItemText>
          </ListItem>
        ))}
      </List>

      {/* Single Document Upload */}
      <Typography>Upload a Single Document</Typography>
      <FileUploader handleChange={handleChange(setDocument)} name="document" types={documentTypes} label="Drag & drop or click here to upload" uploadedLabel="Uploaded successfully!" />
      <List>
        {document.map((file, index) => (
          <ListItem key={index}>
            <ListItemText>
              <a href={createDownloadLink(file)} download={file.name}>
                {file.name}
              </a>
            </ListItemText>
          </ListItem>
        ))}
      </List>

      {/* Multi-Image Upload */}
      <Typography>Upload Multiple Images</Typography>
      <FileUploader multiple handleChange={handleChange(setMultiImages, true)} name="multiImages" types={imageTypes} label="Drag & drop or click here to upload" uploadedLabel="Uploaded successfully!" />
      <List>
        {multiImages.map((file, index) => (
          <ListItem key={index}>
            <ListItemText>
              <a href={createDownloadLink(file)} download={file.name}>
                {file.name}
              </a>
            </ListItemText>
          </ListItem>
        ))}
      </List>

      {/* Multi-Document Upload */}
      <Typography>Upload Multiple Documents</Typography>
<FileUploader
  multiple
  handleChange={handleChange(setMultiDocs, true)}
  name="multiDocs"
  types={documentTypes}
  label="Drag & drop or click here to upload"
  uploadedLabel="Uploaded successfully!"
/>

{multiDocs.length > 0 ? ( // ✅ Corrected condition
  <List>
    {multiDocs.map((file, index) => (
      <ListItem key={index}>
        <ListItemText>
          <a href={createDownloadLink(file)} download={file.name}>
            {file.name}
          </a>
        </ListItemText>
      </ListItem>
    ))}
  </List>
) : (
  <Typography>No documents uploaded</Typography> // ✅ Better fallback message
)}

     
    </Paper>
  );
}



export const SignaturePad = () => {
  const sigCanvas = useRef(null);
  const [imageURL, setImageURL] = useState(null);

  // Function to save signature as an image
  const saveSignature = () => {
    if (sigCanvas.current) {
      setImageURL(sigCanvas.current.toDataURL("image/png"));
    }
  };

  // Function to clear the signature
  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setImageURL(null);
    }
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
    penColor='blue'
        canvasProps={{ className: "sigCanvas",  style: { border: "1px dashed #B6B6B6", borderRadius: "5px", width:'100%' }}}
      />
      <br />
      <button onClick={saveSignature}>Save</button>
      <button onClick={clearSignature}>Clear</button>
      {imageURL && (
        <div>
          <h3>Saved Signature:</h3>
          <img src={imageURL} alt="signature" />
        </div>
      )}
    </div>
  );
};




export const BasicUsage = () => {
  const [country, setCountry] = useState('');


  const onChangeCountry = (val) => {
    setCountry(val);
   
  };

  return (
    <>
      <CountryDropdown value={country} onChange={onChangeCountry} />
     
    </>
  );
};



export  function CountryAutocomplete() {
  const [options, setOptions] = useState([]); // State to store API data
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedCountry, setSelectedCountry] = useState(null); // Selected value

  useEffect(() => {
    setLoading(true);

    // Example API: Fetch country list
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // Transform API response to { label, value } format
        const countryOptions = data.map((country) => ({
          label: country.name.common,
          value: country.cca2, // Country code (e.g., US, IN)
        }));

        setOptions(countryOptions); // Store options
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      value={selectedCountry}
      onChange={(event, newValue) => setSelectedCountry(newValue)}
      loading={loading} // Show loading spinner
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Country"
          variant="outlined"
          slotProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
