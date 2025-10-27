import { readFileSync } from "node:fs";
import { ImageResponse } from "next/og";
import { metadataImage } from "@/lib/metadata";

export const GET = metadataImage.createAPI((page) => {
  const geistSemibold = readFileSync("fonts/Geist-SemiBold.ttf");
  const geistBold = readFileSync("fonts/Geist-Bold.ttf");

  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-end items-start p-14 bg-neutral-100">
        <div tw="flex absolute top-10 right-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={128}
            height={128}
          >
            <circle fill="#f5f5f5" cx="256.5" cy="256" r="256" />
            <g>
              <path
                fill="#0a0a0a"
                d="M459.36,189.98c-21.11-64.65-72.2-115.73-136.85-136.85l136.85,136.85Z"
              />
              <path
                fill="#0a0a0a"
                d="M465.91,297.7c2.42-12.37,3.77-25.12,3.96-38.16L252.96,42.64c-13.04.19-25.79,1.54-38.16,3.96l251.11,251.11Z"
              />
              <path
                fill="#0a0a0a"
                d="M169.86,60.71c-75.14,33.15-127.59,108.3-127.59,195.71,0,118.09,95.73,213.82,213.82,213.82,87.41,0,162.55-52.45,195.71-127.59L169.86,60.71Z"
              />
            </g>
          </svg>
        </div>
        <span tw="text-start text-3xl text-neutral-700 font-semibold">
          Learn The Web -{" "}
          {page.slugs[0]?.charAt(0).toUpperCase() + page.slugs[0]?.slice(1)}
        </span>
        <span tw="mt-4 text-start text-7xl text-neutral-900 font-bold">
          {page.data.title}
        </span>
        <span tw="mt-6 text-start text-5xl text-neutral-800 font-semibold">
          {page.data.description}
        </span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: geistSemibold,
          style: "normal",
          weight: 600,
        },
        {
          name: "Geist",
          data: geistBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
});

export function generateStaticParams() {
  return metadataImage.generateParams();
}
