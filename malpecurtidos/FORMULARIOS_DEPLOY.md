# Pasos Manuales Pendientes

## 1. Configurar variables en Vercel
En el proyecto de Vercel agrega estas variables de entorno:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `FORM_SECRET`
- `SALES_EMAIL`

Valor recomendado para `SALES_EMAIL`:

```env
ventas@malpe.com.mx
```

`FORM_SECRET` debe ser un valor largo y aleatorio.

## 2. Verificar dominio remitente en Resend
En Resend:

- Verifica el dominio desde el que quieres enviar correos.
- Usa ese remitente verificado como valor de `RESEND_FROM_EMAIL`.

Ejemplo:

```env
Solicitudes MALPE <noreply@tudominio.com>
```

## 3. Reemplazar enlaces de privacidad
Actualmente los formularios usan `href="#"` para la política de privacidad.

Debes:

- Crear o definir la URL real de la política.
- Reemplazar esos enlaces en los formularios.

## 4. Desplegar a Vercel
Después de configurar variables:

- Haz push al repositorio.
- Lanza un nuevo deploy en Vercel.

## 5. Probar cada formulario en producción
Prueba manualmente estos flujos:

- Solicitud de muestra individual
- Solicitud de ficha técnica
- Solicitud de muestras desde el carrito
- Formulario de contacto
- Formulario del showroom

Verifica en cada uno:

- Mensaje visual de éxito
- Mensaje visual de error cuando falte un campo
- Llegada del correo a `ventas@malpe.com.mx`
- Que el `reply-to` sea el correo capturado del usuario

## 6. Validar seguridad en producción
Confirma manualmente:

- Que el sitio cargue bien con CSP activa
- Que Google Fonts siga funcionando
- Que el mapa de Google en contacto siga funcionando
- Que los formularios no fallen por cookies o headers en Vercel

## 7. Revisar carpeta de spam
Durante las primeras pruebas:

- Revisa inbox y spam de `ventas@malpe.com.mx`
- Marca los correos como seguros si es necesario

## 8. Recomendacion operativa
Define internamente:

- Quién responde muestras
- Quién responde fichas técnicas
- Tiempo máximo de respuesta comercial

Eso ya no requiere cambios de código, pero sí operación.
