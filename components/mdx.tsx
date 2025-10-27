import type { ComponentProps } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";

type YouTubeEmbedProps = ComponentProps<typeof YouTubeEmbed>;

export function CustomYoutubeEmbed({ videoid, ...props }: YouTubeEmbedProps) {
  return (
    <div className="rounded-lg aspect-video mx-auto overflow-hidden my-8">
      <YouTubeEmbed videoid={videoid} style="max-width: 100%" {...props} />
    </div>
  );
}
