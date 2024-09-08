import Faculty from "@/types/faculty";

export const getPostOffices = (number: number): Faculty[] => {
  const post_offices: Faculty[] = [];
  for (let i = 1; i <= number; i++) {
    const post_office: Faculty = {
      name: `稚内郵便局${i}`,
      pref: "北海道",
      city: "稚内市",
      district: `地区${i}`,
      urban_point: 100,
      google_map_url: "https://hogehoge.com",
      mesh_map_path: "/hogehoge",
    };
    post_offices.push(post_office);
  }
  return post_offices;
};

export const postOffice: Faculty = {
  name: "稚内郵便局",
  pref: "北海道",
  city: "稚内市",
  district: "稚内地区",
  urban_point: 100,
  google_map_url: "https://hogehoge.com",
  mesh_map_path: "/hogehoge",
};
