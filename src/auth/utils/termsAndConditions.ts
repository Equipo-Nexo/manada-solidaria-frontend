type TermsSection = {
  title: string;
  paragraphs: readonly string[];
  items?: readonly string[];
  closingParagraphs?: readonly string[];
};

export const termsAndConditions = {
  title: "Términos y Condiciones de Manada Solidaria",
  termsVersion: "1.0",
  updatedAt: "Versión 1.0 - Última actualización: 6/11/2026",
  introduction:
    "Al registrarte en Manada Solidaria, aceptás los Términos y Condiciones. Te sugerimos leerlos con atención.",
  sections: [
    {
      title: "1. Sobre Manada Solidaria",
      paragraphs: [
        "Manada Solidaria es una plataforma digital destinada a conectar personas interesadas en el bienestar animal, facilitando la difusión de animales perdidos, encontrados y en adopción, así como el acceso a información sobre veterinarias, campañas y otras iniciativas solidarias.",
        "Al registrarte y utilizar la plataforma, aceptás los presentes Términos y Condiciones y reconocés haber recibido información sobre el tratamiento de tus datos personales.",
      ],
    },
    {
      title: "2. Registro de usuario",
      paragraphs: [
        "Para crear una cuenta en Manada Solidaria, solicitamos un nombre de usuario, una dirección de correo electrónico y una contraseña.",
        "Podés elegir libremente tu nombre de usuario, sin necesidad de utilizar tu nombre real, siempre que no sea ofensivo, engañoso o suplante la identidad de otra persona.",
        "El correo electrónico se utiliza para identificar tu cuenta y facilitar las comunicaciones relacionadas con el servicio. La contraseña permite proteger el acceso a tu cuenta.",
        "Te comprometés a proporcionar una dirección de correo electrónico válida, mantener actualizada la información necesaria para el funcionamiento de la plataforma y utilizar tu cuenta de manera responsable.",
      ],
    },
    {
      title: "3. Uso de la ubicación geográfica",
      paragraphs: [
        "Manada Solidaria puede solicitar acceso a tu ubicación geográfica para ofrecer funcionalidades relacionadas con la cercanía y localización de servicios y reportes.",
        "La ubicación se utiliza principalmente para:",
      ],
      items: [
        "Permitir la ubicación de reportes de animales perdidos, encontrados o en adopción.",
        "Mostrar reportes de animales en un mapa interactivo.",
        "Ordenar y mostrar veterinarias según su cercanía con tu ubicación.",
        "Facilitar la búsqueda de información relevante en tu zona.",
      ],
      closingParagraphs: [
        "El acceso a la ubicación del dispositivo requiere tu autorización. Podés modificar o revocar este permiso desde la configuración de tu dispositivo o navegador.",
        "Importante: la ubicación de un reporte publicado puede ser visible para otros usuarios en el mapa. La ubicación actual de tu dispositivo no se publicará automáticamente por el solo hecho de utilizar la aplicación.",
      ],
    },
    {
      title: "4. Número de teléfono y visibilidad pública",
      paragraphs: [
        "Durante el registro, podés proporcionar voluntariamente tu número de teléfono.",
        "Si decidís participar en la sección Comunidad y habilitás la publicación de tu número, este podrá ser visualizado por otros usuarios de Manada Solidaria para facilitar el contacto relacionado con actividades de rescate, tránsito, adopción y colaboración animal.",
        "Al ingresar tu número de teléfono, aceptás que sea visible para otros usuarios de la plataforma.",
        "Te recomendamos proporcionar únicamente un número con el que desees recibir comunicaciones relacionadas con estas actividades.",
      ],
    },
    {
      title: "5. Publicaciones y responsabilidad de los usuarios",
      paragraphs: [
        "Las personas usuarias son responsables de la información, fotografías y demás contenidos que publiquen.",
        "Al utilizar Manada Solidaria, te comprometés a:",
      ],
      items: [
        "Compartir información verdadera y respetuosa.",
        "No publicar contenido engañoso, ofensivo o que perjudique a personas o animales.",
        "Respetar la privacidad y los derechos de otras personas.",
        "Utilizar la información de contacto de otros usuarios únicamente para fines legítimos y relacionados con la plataforma.",
      ],
      closingParagraphs: [
        "Manada Solidaria podrá moderar o retirar publicaciones que incumplan estas condiciones, de acuerdo con sus políticas de moderación.",
      ],
    },
    {
      title: "6. Información sobre veterinarias y campañas",
      paragraphs: [
        "La plataforma puede proporcionar información sobre veterinarias, servicios de guardia, campañas y actividades relacionadas con el bienestar animal.",
        "Esta información tiene carácter informativo y puede estar sujeta a modificaciones.",
        "Recomendamos confirmar directamente con los establecimientos u organizadores la disponibilidad, los horarios y las condiciones de los servicios ofrecidos.",
      ],
    },
    {
      title: "7. Protección de datos personales",
      paragraphs: [
        "Manada Solidaria se compromete a tratar los datos personales conforme a la legislación argentina aplicable, especialmente la Ley 25.326 de Protección de Datos Personales.",
        "Los datos se utilizarán para las finalidades informadas, adoptando medidas de seguridad adecuadas para protegerlos contra accesos no autorizados, pérdidas o usos indebidos.",
        "Podés solicitar el acceso, la rectificación, la actualización o la supresión de tus datos personales, según corresponda legalmente, mediante los canales de contacto establecidos en la Política de Privacidad.",
      ],
    },
    {
      title: "8. Modificaciones de los términos",
      paragraphs: [
        "Manada Solidaria podrá actualizar estos Términos y Condiciones para reflejar cambios en sus funcionalidades, servicios o requisitos legales.",
        "Cuando las modificaciones sean relevantes, se informarán a los usuarios por los medios adecuados.",
      ],
    },
    {
      title: "9. Contacto",
      paragraphs: [
        "Para consultas relacionadas con estos términos, la privacidad o el tratamiento de datos personales, podés comunicarte a través de:",
        "Correo electrónico: 06nexo@gmail.com",
        "Responsable de la plataforma: Equipo 06 Nexo",
      ],
    },
  ] satisfies readonly TermsSection[],
};
