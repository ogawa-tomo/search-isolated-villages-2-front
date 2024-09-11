import { AreaEnName } from "@/types/Area";

export const prefectures = [
  {
    jpName: "北海道",
    enName: "hokkaido",
  },
  {
    jpName: "青森県",
    enName: "aomori",
  },
  {
    jpName: "岩手県",
    enName: "iwate",
  },
  {
    jpName: "宮城県",
    enName: "miyagi",
  },
  {
    jpName: "秋田県",
    enName: "akita",
  },

  {
    jpName: "山形県",
    enName: "yamagata",
  },
  {
    jpName: "福島県",
    enName: "hukushima",
  },
  {
    jpName: "茨城県",
    enName: "ibaraki",
  },
  {
    jpName: "栃木県",
    enName: "tochigi",
  },
  {
    jpName: "群馬県",
    enName: "gunma",
  },
  {
    jpName: "埼玉県",
    enName: "saitama",
  },
  {
    jpName: "千葉県",
    enName: "chiba",
  },
  {
    jpName: "東京都",
    enName: "tokyo",
  },
  {
    jpName: "神奈川県",
    enName: "kanagawa",
  },
  {
    jpName: "新潟県",
    enName: "niigata",
  },
  {
    jpName: "富山県",
    enName: "toyama",
  },
  {
    jpName: "石川県",
    enName: "ishikawa",
  },
  {
    jpName: "福井県",
    enName: "fukui",
  },
  {
    jpName: "山梨県",
    enName: "yamanashi",
  },
  {
    jpName: "長野県",
    enName: "nagano",
  },
  {
    jpName: "岐阜県",
    enName: "gifu",
  },
  {
    jpName: "静岡県",
    enName: "shizuoka",
  },
  {
    jpName: "愛知県",
    enName: "aichi",
  },
  {
    jpName: "三重県",
    enName: "mie",
  },
  {
    jpName: "滋賀県",
    enName: "shiga",
  },
  {
    jpName: "京都府",
    enName: "kyoto",
  },
  {
    jpName: "大阪府",
    enName: "osaka",
  },
  {
    jpName: "兵庫県",
    enName: "hyogo",
  },
  {
    jpName: "奈良県",
    enName: "nara",
  },
  {
    jpName: "和歌山県",
    enName: "wakayama",
  },
  {
    jpName: "鳥取県",
    enName: "tottori",
  },
  {
    jpName: "島根県",
    enName: "shimane",
  },
  {
    jpName: "岡山県",
    enName: "okayama",
  },
  {
    jpName: "広島県",
    enName: "hiroshima",
  },
  {
    jpName: "山口県",
    enName: "yamaguchi",
  },
  {
    jpName: "徳島県",
    enName: "tokushima",
  },
  {
    jpName: "香川県",
    enName: "kagawa",
  },
  {
    jpName: "愛媛県",
    enName: "ehime",
  },
  {
    jpName: "高知県",
    enName: "kochi",
  },
  {
    jpName: "福岡県",
    enName: "fukuoka",
  },
  {
    jpName: "佐賀県",
    enName: "saga",
  },
  {
    jpName: "長崎県",
    enName: "nagasaki",
  },
  {
    jpName: "熊本県",
    enName: "kumamoto",
  },
  {
    jpName: "大分県",
    enName: "oita",
  },
  {
    jpName: "宮崎県",
    enName: "miyazaki",
  },
  {
    jpName: "鹿児島県",
    enName: "kagoshima",
  },
  {
    jpName: "沖縄県",
    enName: "okinawa",
  },
] as const;

export const regions = [
  {
    jpName: "北海道",
    enName: "hokkaido",
  },
  {
    jpName: "東北",
    enName: "tohoku",
  },
  {
    jpName: "関東",
    enName: "kanto",
  },
  {
    jpName: "北陸",
    enName: "hokuriku",
  },
  {
    jpName: "中部",
    enName: "chubu",
  },
  {
    jpName: "近畿",
    enName: "kinki",
  },
  {
    jpName: "中国",
    enName: "chugoku",
  },
  {
    jpName: "四国",
    enName: "shikoku",
  },
  {
    jpName: "九州",
    enName: "kyushu",
  },
  {
    jpName: "沖縄",
    enName: "okinawa",
  },
] as const;

export const allCountry = {
  jpName: "全国",
  enName: "all_country",
} as const;

export const areas = [...prefectures, ...regions, allCountry] as const;

export const getAreaByEnName = (enName: AreaEnName) => {
  const area = areas.find((area) => area.enName === enName);

  return area;
};

export const areaEnNames = areas.map((area) => area.enName);

export function assertAreaEnName(name: string): asserts name is AreaEnName {
  if ((areaEnNames as string[]).includes(name)) return;

  throw new Error("エリア名ではありません");
}
