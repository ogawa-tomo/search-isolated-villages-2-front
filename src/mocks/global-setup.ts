import { mockPostOfficeFortune } from "./mockPostOfficeFortune";
import { mockPostOffices } from "./mockPostOffices";
import { mockVillages } from "./mockVillages";

async function globalSetup() {
  await mockVillages();
  await mockPostOffices();
}

export default globalSetup;
