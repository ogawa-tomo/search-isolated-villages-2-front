import { mockPostOffices } from './mockPostOffices';
import { mockVillageFortune } from './mockVillageFortune';
import { mockVillages } from './mockVillages';

async function globalSetup() {
  await mockVillages();
  await mockPostOffices();
  await mockVillageFortune();
}

export default globalSetup;
