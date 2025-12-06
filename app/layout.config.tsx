import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Logo } from "@/lib/icons";
import {
  PanelsTopLeft,
  Server,
  Album,
} from "lucide-react";
import Image from "next/image";
import banner from "@/public/chartbuilder_notebook.png";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Logo />
        <span className="font-medium [header_&]:text-[15px]">
          Adeloop
        </span>
      </>
    ),
    transparentMode: "top",
  },
  links: [
    {
      type: "menu",
      text: "Documentation",
      url: "/docs/adeloop",
      items: [
        {
          menu: {
            banner: (
              <div className="-mx-3 -mt-3">
                <Image
                  src={banner}
                  alt="Banner Image"
                  className="rounded-t-lg object-cover"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom,white 60%,transparent)",
                  }}
                />
              </div>
            ),
            className: "md:row-span-2",
          },
          icon: <Album />,
          text: "Getting Started",
          description: "Your Journey into Data Analytics with Adeloop.",
          url: "/docs/adeloop",
        },
        {
          icon: <PanelsTopLeft />,
          text: "Adeloop Platform",
          description: "Learn about the Adeloop cloud Jupyter notebook platform.",
          url: "/docs/adeloop",
          active: "nested-url",
          menu: {
            className: "lg:col-start-2",
          },
        },
        {
          icon: <Server />,
          text: "Adeloop Agent",
          description: "AI Agent for data analytics and visualization.",
          url: "/docs/agent",
          active: "nested-url",
          menu: {
            className: "lg:col-start-2",
          },
        },
      ],
    },
    {
      text: "Highlights",
      url: "/#highlights",
      active: "nested-url",
    },
  ],
};