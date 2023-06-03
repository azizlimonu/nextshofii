export default function dataURItoBlob(dataURI) {
  const [header, body] = dataURI.split(",");
  const mimeString = header.split(":")[1].split(";")[0];
  const byteString = atob(body);
  
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ia], { type: mimeString });
}

// Example usage
// const dataURI = "data:image/png;base64,iVBORw0KGg...";
// const blob = dataURItoBlob(dataURI);

// console.log(blob);
// console.log(blob.type);
// // console.log(blob.size);
// console.log(blob) prints the Blob object to the console, showing its properties and methods.
//   console.log(blob.type) retrieves and logs the MIME type of the Blob.
//     console.log(blob.size) retrieves and logs the size of the Blob in bytes.