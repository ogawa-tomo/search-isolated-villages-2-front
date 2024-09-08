import postOfficeLogo from "@/public/post_office.png";
import elementarySchoolLogo from "@/public/school.png";
import stationLogo from "@/public/station.png";
import abandonedStationLogo from "@/public/abandoned_station.jpg";
import michinoekiLogo from "@/public/michinoeki.png";
import newTownLogo from "@/public/new_town.png";
import researchInstituteLogo from "@/public/research_institute.png";
import hotSpringLogo from "@/public/onsen_animal.png";
import { StaticImageData } from "next/image";
import { FacultyCategoryName } from "@/types/FacultyCategory";
import { join } from "path";

export function facultyCategoryLogo(
  facultyCategoryName: FacultyCategoryName,
): StaticImageData {
  switch (facultyCategoryName) {
    case "郵便局":
      return postOfficeLogo;
    case "小学校":
      return elementarySchoolLogo;
    case "駅":
      return stationLogo;
    case "廃駅":
      return abandonedStationLogo;
    case "ニュータウン":
      return newTownLogo;
    case "温泉":
      return hotSpringLogo;
    case "研究機関":
      return researchInstituteLogo;
    case "道の駅":
      return michinoekiLogo;
  }
}

export function facultyCategoryLogoPath(
  facultyCategoryName: FacultyCategoryName,
): string {
  const dir = join(process.cwd(), "src", "public");
  switch (facultyCategoryName) {
    case "郵便局":
      return join(dir, "post_office.png");
    case "小学校":
      return join(dir, "school.png");
    case "駅":
      return join(dir, "station.png");
    case "廃駅":
      return join(dir, "abandoned_station.jpg");
    case "ニュータウン":
      return join(dir, "new_town.png");
    case "温泉":
      return join(dir, "onsen_animal.png");
    case "研究機関":
      return join(dir, "research_institute.png");
    case "道の駅":
      return join(dir, "michinoeki.png");
  }
}
