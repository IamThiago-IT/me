import type { Meta, StoryObj } from "@storybook/react";
import { TimelineSection } from "../../components/TimelineSection";

const meta: Meta<typeof TimelineSection> = {
  title: "Components/TimelineSection",
  component: TimelineSection,
};

export default meta;
type Story = StoryObj<typeof TimelineSection>;

export const Default: Story = {};
