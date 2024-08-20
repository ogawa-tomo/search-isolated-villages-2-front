/* eslint-disable @next/next/no-img-element */
import { getFacultyCategoryFromPathName } from '@/lib/facultyCategories';
import { facultyCategoryLogoPath } from '@/lib/facultyCategoryLogo';
import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';

export default async function Image({ params }) {
  const path = facultyCategoryLogoPath(
    getFacultyCategoryFromPathName(params.facultyCategoryPathName).name
  );
  const logoData = await readFile(path);
  const logoSrc = Uint8Array.from(logoData).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={logoSrc} alt="logo" height={500} />
      </div>
    )
  );
}
