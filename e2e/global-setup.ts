import { mockVillages } from './mockVillages';

async function globalSetup() {
  await mockVillages();
}

export default globalSetup;
