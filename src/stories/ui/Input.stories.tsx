import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../components/ui/input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Email",
    type: "email",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Email",
    type: "email",
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    placeholder: "Password",
    type: "password",
  },
};
