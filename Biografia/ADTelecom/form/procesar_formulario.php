<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Verificar si el token CSRF está presente y es válido
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        die("Error: Token CSRF inválido o ha expirado.");
    }

    // Validar los datos del formulario
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    if ($nombre && $email && $mensaje) {
        // Conectar a la base de datos
        $host = "localhost";
        $usuario = "root"; // Cambiar si es necesario
        $clave = ""; // Cambiar si es necesario
        $bd = "contactos";

        $conexion = new mysqli($host, $usuario, $clave, $bd);
        if ($conexion->connect_error) {
            die("Error de conexión: " . $conexion->connect_error);
        }

        // Insertar los datos en la base de datos
        $stmt = $conexion->prepare("INSERT INTO mensajes_contacto (nombre, email, mensaje) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nombre, $email, $mensaje);
        
        if ($stmt->execute()) {
            echo "Mensaje enviado correctamente.";
        } else {
            echo "Error al enviar el mensaje.";
        }

        $stmt->close();
        $conexion->close();

        // Eliminar el token CSRF para evitar reutilización
        unset($_SESSION['csrf_token']);
    } else {
        echo "Datos del formulario no válidos.";
    }
}
?>
