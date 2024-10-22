import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../FirebaseConfig'; // Verifica que la ruta esté correcta
import { FaTimes } from 'react-icons/fa'; // Importar el ícono de la "X"

const UploadMultipleImages = ({ onImagesUpload }) => {
  const [uploading, setUploading] = useState(false); // Estado para gestionar si las imágenes se están subiendo
  const [previews, setPreviews] = useState([]); // Estado para almacenar las vistas previas de las imágenes
  const [selectedFiles, setSelectedFiles] = useState([]); // Estado para almacenar los archivos seleccionados
  const [fileInputMessage, setFileInputMessage] = useState('No files chosen'); // Mensaje personalizado para el input

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convertir la lista de archivos en un array
    if (!files || files.length === 0) return;

    const newPreviews = [];

    // Actualizar archivos seleccionados
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    // Actualizar el mensaje del input con los nombres de los archivos seleccionados
    const fileNames = [...selectedFiles, ...files].map(file => file.name).join(', ');
    setFileInputMessage(fileNames);

    // Crear las previsualizaciones de las nuevas imágenes
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]); // Añadir nuevas previsualizaciones sin borrar las anteriores
        }
      };
    });
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      uploadImages(); // Subir automáticamente cuando se seleccionan imágenes
    }
  }, [selectedFiles]); // Ejecutar la función cuando se actualiza el array de selectedFiles

  const uploadImages = () => {
    setUploading(true);
    const uploadedImageURLs = [];

    selectedFiles.forEach((file, index) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Error subiendo la imagen: ', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            uploadedImageURLs.push(downloadURL);

            // Verificar si todas las imágenes se han subido
            if (uploadedImageURLs.length === selectedFiles.length) {
              setUploading(false);
              onImagesUpload(uploadedImageURLs); // Pasar las URLs al componente padre
            }
          });
        }
      );
    });
  };

  // Función para eliminar una imagen tanto de la vista previa como de los archivos seleccionados
  const handleRemoveImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);

    setPreviews(newPreviews);
    setSelectedFiles(newSelectedFiles);
  };

  return (
    <>
      {uploading && (
        <div style={overlayStyle}>
          <div style={spinnerStyle}></div>
          <p>Subiendo imágenes...</p>
        </div>
      )}

      <div className="input-group">
        <input
          type="file"
          className="mail_text"
          id="inputGroupFile01"
          onChange={handleImageChange}
          multiple // Permite seleccionar varias imágenes
          disabled={uploading} // Desactivar input mientras se está subiendo
        />
      </div>

      <div className="image-previews" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
        {/* Mostrar las vistas previas de las imágenes */}
        {previews.map((preview, index) => (
          <div
            key={index}
            style={imageContainerStyle}
            onClick={() => handleRemoveImage(index)} // Al hacer clic, eliminar la imagen
          >
            <img
              src={preview}
              alt={`preview-${index}`}
              style={imageStyle}
            />
            <FaTimes style={removeIconStyle} /> {/* Ícono de "X" para eliminar */}
          </div>
        ))}
      </div>
    </>
  );
};

// Estilos para el overlay y el spinner
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semi-transparente
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000, // Asegura que esté por encima de todo el contenido
};

const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: '5px solid #f3f3f3',
  borderTop: '5px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const imageContainerStyle = {
  position: 'relative',
  marginRight: '10px',
  marginBottom: '10px',
  cursor: 'pointer',
  width: '100px',
  height: '100px',
  overflow: 'hidden',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'opacity 0.3s ease',
};

const removeIconStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  color: 'white',
  fontSize: '18px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: '50%',
  padding: '2px',
  opacity: 0,
  transition: 'opacity 0.3s ease',
};

// Animación para mostrar el ícono de "X" al hacer hover sobre la imagen
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .image-previews div:hover img {
    opacity: 0.6;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .image-previews div:hover svg {
    opacity: 1;
  }
`, styleSheet.cssRules.length);

const spinnerKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

styleSheet.insertRule(spinnerKeyframes, styleSheet.cssRules.length);

// Validación de los props usando PropTypes
UploadMultipleImages.propTypes = {
  onImagesUpload: PropTypes.func.isRequired, // Asegura que onImagesUpload es una función y es requerida
};

export default UploadMultipleImages;
