import { formatRoundedFloat, roundToDigits } from "@/lib/rounding";

describe("roundToDigits", () => {
  it("指定した桁数に丸める", () => {
    expect(roundToDigits(24.29479166666666, 4)).toBe(24.2948);
    expect(roundToDigits(25.997352068118108, 2)).toBe(26);
  });

  it("乗算による浮動小数点誤差の影響を受けない", () => {
    // Math.round(142.26135 * 10000) / 10000 は誤差により142.2614になってしまうが、
    // Python の round(142.26135, 4) は142.2613になる。この値と一致させる。
    expect(roundToDigits(142.26135, 4)).toBe(142.2613);
  });

  it("ちょうど中間の値はPythonのround()と同様に偶数側へ丸める(round-half-to-even)", () => {
    // 32.90625(=32+29/32)は2進数で正確に表現できる値で、4桁目がちょうど中間(5)になる。
    // 直前の桁が2(偶数)なので偶数丸めでは切り捨てて32.9062になる。
    // toFixedなど「0から遠い方へ丸める」実装では32.9063になってしまう。
    expect(roundToDigits(32.90625, 4)).toBe(32.9062);
    // 0.09375(=3/32)は直前の桁が7(奇数)なので、偶数になるよう切り上げて0.0938になる。
    expect(roundToDigits(3 / 32, 4)).toBe(0.0938);
  });
});

describe("formatRoundedFloat", () => {
  it("小数部が残るときはそのまま文字列化する", () => {
    expect(formatRoundedFloat(24.2948, 4)).toBe("24.2948");
    expect(formatRoundedFloat(140.1, 4)).toBe("140.1");
  });

  it("整数値になるときもPythonのstr(round(x))同様に小数点以下を残す", () => {
    expect(formatRoundedFloat(43.0, 4)).toBe("43.0");
    expect(formatRoundedFloat(131, 4)).toBe("131.0");
    expect(formatRoundedFloat(140.00001, 4)).toBe("140.0");
  });
});
