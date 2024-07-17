import { mockPostOfficeFortune } from './mockPostOfficeFortune';
import { mockPostOffices } from './mockPostOffices';
import { mockVillageFortune } from './mockVillageFortune';
import { mockVillages } from './mockVillages';

async function globalSetup() {
  await mockVillages();
  await mockPostOffices();
  await mockVillageFortune();
  await mockPostOfficeFortune();
}

export default globalSetup;
