export const openGmail = (email: string, subject: string, body: string) => {
  const encodedEmail = encodeURIComponent(email);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isAndroid) {
    window.location.href =
      `intent://compose?to=${encodedEmail}` +
      `&subject=${encodedSubject}` +
      `&body=${encodedBody}` +
      `#Intent;scheme=mailto;package=com.google.android.gm;end`;

    return;
  }

  if (isIOS) {
    window.location.href =
      `googlegmail://co?to=${encodedEmail}` +
      `&subject=${encodedSubject}` +
      `&body=${encodedBody}`;

    return;
  }

  window.open(
    `https://mail.google.com/mail/?view=cm&to=${encodedEmail}&su=${encodedSubject}&body=${encodedBody}`,
    "_blank",
    "noopener,noreferrer",
  );
};
