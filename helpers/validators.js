export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Lütfen e-posta adresi giriniz";
  if (!re.test(email)) return "E-posta geçersiz";
  return "";
}
export function passwordValidator(password) {
  if (!password) return "Lütfen şifre giriniz.";
  if (password.length < 8) return "Şifreniz 8 karakterden kısa olamaz";
  return "";
}
export function inputValidator(text) {
  if (!text) return "Bu alan zorunludur";
  if (text.length < 1) return "Bu alan zorunludur";
  return "";
}
