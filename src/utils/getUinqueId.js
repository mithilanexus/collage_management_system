const generateParentId = (name, phone, citizenshipNumber) => {
  const prefix = name
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .slice(0, 3);
  const phoneDigits = phone.replace(/\D/g, "");
  const numberPart = parseInt(phoneDigits.slice(-4))
    .toString()
    .padStart(4, "0");
  const citizenshipNumberDigits = citizenshipNumber.toString().slice(-2); // Last 2 digits of citizenshipNumber number
  const checksum = String.fromCharCode(
    65 + (parseInt(numberPart + citizenshipNumberDigits) % 26)
  );

  return `${prefix}${numberPart}${citizenshipNumberDigits}${checksum}`;
};
  const generateStudentId = (name, roll) => {
    const prefix = name
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase()
      .slice(0, 3);
    const rollDigits = roll.toString().slice(-2); // Last 2 digits of roll number
    const checksum = String.fromCharCode(
      65 + (parseInt(rollDigits) % 26)
    );

    return `${prefix}${rollDigits}${checksum}`;
  };

export { generateParentId, generateStudentId };
