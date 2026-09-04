import type { Meta, StoryObj } from "@storybook/react";
import { I18nProvider } from "../../lib/i18n";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";

const meta: Meta<typeof LanguageSwitcher> = {
  title: "Components/LanguageSwitcher",
  component: LanguageSwitcher,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <I18nProvider>
        <Story />
      </I18nProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {};

export const WithSearch: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Dropdown pesquisável com 6 idiomas (PT-BR, EN, ES, JA, FR, RU). Digite para filtrar, ex: 'japon', 'russo', 'spanish'.",
      },
    },
  },
};
