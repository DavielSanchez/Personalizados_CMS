import { useState } from 'react';
import PropTypes from 'prop-types';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../FirebaseConfig'; // Verifica que la ruta esté correcta

const UploadImage = ({ onImageUpload }) => {
  const [uploading, setUploading] = useState(false); // Estado para gestionar si la imagen se está subiendo
  const [progress, setProgress] = useState(0); // Estado para almacenar el progreso de la subida

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]; // Obtén la imagen directamente
    if (!selectedImage) return;

    console.log("Imagen seleccionada: ", selectedImage);

    // Crear referencia a la imagen en Firebase Storage
    const storageRef = ref(storage, `images/${selectedImage.name}`);

    // Subir la imagen
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    // Activar estado de carga
    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Calcular el progreso de la subida
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log(`Subida es ${progress}% completa`);
      },
      (error) => {
        console.error("Error subiendo la imagen: ", error);
        setUploading(false); // En caso de error, detener el estado de carga
      },
      () => {
        // Una vez completada la subida, obtener la URL de la imagen
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("URL de descarga obtenida: ", downloadURL);

          if (downloadURL) {
            // Pasar la URL al componente padre
            onImageUpload(downloadURL);
          } else {
            console.error("Error: No se pudo obtener la URL.");
          }

          // Subida completada, desactivar estado de carga
          setUploading(false);
          setProgress(0); // Reiniciar el progreso
        });
      }
    );
  };

  return (
    <>
      {/* Mostrar un overlay de carga si uploading es true */}
      {uploading && (
        <div style={overlayStyle}>
          <div style={spinnerStyle}></div>
          {/* <p>Subiendo imagen: {Math.round(progress)}%</p> */}
        </div>
      )}

      <div className="input-group">
        <input
          type="file"
          className="mail_text"
          id="inputGroupFile01"
          onChange={handleImageChange}
          disabled={uploading} // Desactivar input mientras se está subiendo
        />
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
  borderTop: '5px solid #fd7e14',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

// Animación para el spinner
const spinnerKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Añadir la animación al estilo global
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(spinnerKeyframes, styleSheet.cssRules.length);

// Validación de los props usando PropTypes
UploadImage.propTypes = {
  onImageUpload: PropTypes.func.isRequired, // Asegura que onImageUpload es una función y es requerida
};

export default UploadImage;
