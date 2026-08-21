// doubleの正確な10進展開を得るのに十分な桁数（IEEE754倍精度で必要な最大桁数を上回る）
const EXACT_DECIMAL_DIGITS = 60;

// Pythonのround()はPythonの内部実装に合わせて偶数丸め(round-half-to-even)を行う。
// JSのMath.round/toFixedは共に「0から遠い方に丸める」ため、
// 32.90625を4桁に丸めると値が一致しない(Python: 32.9062, JS: 32.9063)。
// 一致させるため、doubleの正確な10進展開から桁ごとに偶数丸めを行う。
const roundToDecimalString = (value: number, digits: number): string => {
  const negative = value < 0;
  const exact = Math.abs(value).toFixed(EXACT_DECIMAL_DIGITS);
  const [intPart, fracPart] = exact.split(".") as [string, string];
  const keep = fracPart.slice(0, digits);
  const rest = fracPart.slice(digits);

  const firstRestDigit = rest.charAt(0) || "0";
  const isExactHalf = firstRestDigit === "5" && /^0*$/.test(rest.slice(1));
  const combinedDigits = intPart + keep;
  const lastKeptDigit = Number(combinedDigits.slice(-1));

  let roundUp: boolean;
  if (firstRestDigit > "5") {
    roundUp = true;
  } else if (firstRestDigit < "5") {
    roundUp = false;
  } else if (!isExactHalf) {
    roundUp = true;
  } else {
    roundUp = lastKeptDigit % 2 !== 0;
  }

  const roundedDigits = (
    roundUp ? BigInt(combinedDigits) + BigInt(1) : BigInt(combinedDigits)
  )
    .toString()
    .padStart(combinedDigits.length, "0");

  const splitIndex = roundedDigits.length - digits;
  const resultIntPart = roundedDigits.slice(0, splitIndex) || "0";
  const resultFracPart = roundedDigits.slice(splitIndex);
  const isZero = /^0+$/.test(roundedDigits);
  const sign = negative && !isZero ? "-" : "";

  return digits > 0
    ? `${sign}${resultIntPart}.${resultFracPart}`
    : `${sign}${resultIntPart}`;
};

export const roundToDigits = (value: number, digits: number): number =>
  Number(roundToDecimalString(value, digits));

// Pythonのstr(round(value, digits))は131.0のように整数値でも小数点以下を残すが、
// JSのNumber→String変換は131のように小数点以下を落とすため、文字列化時に合わせる
export const formatRoundedFloat = (value: number, digits: number): string => {
  const rounded = roundToDecimalString(value, digits);
  if (!rounded.includes(".")) return rounded;

  const trimmed = rounded.replace(/0+$/, "");
  return trimmed.endsWith(".") ? `${trimmed}0` : trimmed;
};
