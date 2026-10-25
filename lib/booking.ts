export interface Values {
  ownerName: string;
  email: string;
  mobile: string;
  suburb: string;
  dogName: string;
  coat: string;
  size: string;
  packageId: string;
  date: string;
  window: string;
  notes: string;
  anxious: boolean;
  demoOk: boolean;
}

export type Errors = Partial<Record<keyof Values, string>>;

export const EMPTY: Values = {
  ownerName: "",
  email: "",
  mobile: "",
  suburb: "",
  dogName: "",
  coat: "",
  size: "",
  packageId: "",
  date: "",
  window: "morning",
  notes: "",
  anxious: false,
  demoOk: false,
};

export const ORDER: (keyof Values)[] = ["ownerName", "email", "mobile", "suburb", "dogName", "coat", "size", "date", "demoOk"];

export function validate(v: Values, today: string): Errors {
  const e: Errors = {};
  if (!v.ownerName.trim()) e.ownerName = "Please tell us your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "That email doesn’t look right. Try name@example.com.";
  const digits = v.mobile.replace(/[^\d]/g, "");
  if (!v.mobile.trim()) e.mobile = "Please enter a mobile number.";
  else if (digits.length < 8 || digits.length > 12) e.mobile = "Enter a mobile number with 8 to 12 digits.";
  if (!v.suburb) e.suburb = "Please choose your suburb.";
  if (!v.dogName.trim()) e.dogName = "What’s your dog’s name?";
  if (!v.coat) e.coat = "Please choose a coat type.";
  if (!v.size) e.size = "Please choose a size.";
  if (!v.date) e.date = "Pick the day you’d like.";
  else if (today && v.date < today) e.date = "Please choose today or a future date.";
  if (!v.demoOk) e.demoOk = "Please tick to confirm you understand this is a demo.";
  return e;
}

