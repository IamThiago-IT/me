import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { ThemeProvider } from "next-themes";
import { I18nProvider } from "../src/lib/i18n";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        order: ["Introduction", "UI", "Components"],
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        I18nProvider,
        null,
        React.createElement(
          ThemeProvider,
          {
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
          },
          React.createElement(Story, null)
        )
      ),
  ],
};

export default preview;