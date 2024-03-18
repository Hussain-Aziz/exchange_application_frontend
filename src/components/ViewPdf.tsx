'use client'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';



export default function ViewPdf({ link, height }: { link: string, height?: string }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [
      defaultTabs[0],
    ],
  });

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
      <div style={{height: height ?? '400px'}}>
        <Viewer
          fileUrl={link}
          plugins={[
            defaultLayoutPluginInstance,
          ]}
        />
      </div>
    </Worker>
  );
}