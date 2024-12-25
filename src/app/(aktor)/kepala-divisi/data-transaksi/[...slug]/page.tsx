"use client";
import React from 'react';
import KreditDetail from './KreditDetail';
import SewaDetail from './SewaDetail';
import CashDetail from './CashDetail';

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default function CatchAllPage({ params }: PageProps) {
  // Unwrap the params using React.use()
  const { slug } = React.use(params);

  // Return a meaningful fallback if slug is undefined or empty
  if (!slug || slug.length === 0) {
    return <div>Invalid route or no details available.</div>;
  }

  return (
    <div>
      {/* Render components conditionally based on slug */}
      {slug[0] === 'sewa' && <SewaDetail />}
      {slug[0] === 'kredit' && <KreditDetail />}
      {slug[0] === 'cash' && <CashDetail />}

      {/* Optionally handle cases where slug doesn't match */}
      {!['sewa', 'kredit', 'cash'].includes(slug[0]) && (
        <div>Invalid transaction type: {slug[0]}</div>
      )}
    </div>
  );
}
