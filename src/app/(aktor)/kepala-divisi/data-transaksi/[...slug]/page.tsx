
import React from 'react';
import KreditDetail from './KreditDetail';
import SewaDetail from './SewaDetail';
import CashDetail from './CashDetail';

type PageProps = {
    params: {
      slug: string[];
    };
  };
  
  export default function CatchAllPage({ params }: PageProps) {
    const { slug } = params;
  
    // Konversi slug array ke string yang lebih mudah dibaca
  
    return (
      <div>
        {/* Tambahkan logika berdasarkan tipe slug */}
        {slug[0] === 'sewa' && <SewaDetail />}
        {slug[0] === 'kredit' && <KreditDetail />}
        {slug[0] === 'cash' && <CashDetail />}
  
        {/* Tambahkan informasi detail lainnya jika diperlukan */}
      </div>
    );
  }
  