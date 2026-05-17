import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Design Tokens/Typography",
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const typographyScale = [
	{ name: "h1", classes: "text-4xl sm:text-5xl md:text-6xl font-bold", sample: "Heading 1" },
	{ name: "h2", classes: "text-3xl sm:text-4xl font-bold", sample: "Heading 2" },
	{ name: "h3", classes: "text-2xl sm:text-3xl font-semibold", sample: "Heading 3" },
	{ name: "h4", classes: "text-xl sm:text-2xl font-semibold", sample: "Heading 4" },
	{ name: "h5", classes: "text-lg sm:text-xl font-semibold", sample: "Heading 5" },
	{ name: "h6", classes: "text-base sm:text-lg font-semibold", sample: "Heading 6" },
	{ name: "body", classes: "text-base leading-relaxed", sample: "Body text - The quick brown fox jumps over the lazy dog" },
	{ name: "small", classes: "text-sm", sample: "Small text - UI labels and hints" },
	{ name: "xs", classes: "text-xs", sample: "Extra small - Captions and metadata" },
];

export const Scale: Story = {
	render: () => (
		<div className="p-8 space-y-8">
			<div>
				<h1 className="text-3xl font-bold mb-2">Typography Scale</h1>
				<p className="text-muted-foreground">
					Font: <code className="bg-muted px-1.5 py-0.5 rounded">Inter</code>
				</p>
			</div>

			<div className="space-y-6">
				{typographyScale.map((item) => (
					<div key={item.name} className="grid grid-cols-12 gap-4 items-end border-b pb-6">
						<div className="col-span-2">
							<span className="text-sm font-medium text-muted-foreground">{item.name}</span>
						</div>
						<div className={`col-span-7 ${item.classes}`}>{item.sample}</div>
						<div className="col-span-3">
							<code className="text-xs bg-muted px-2 py-1 rounded block">{item.classes}</code>
						</div>
					</div>
				))}
			</div>
		</div>
	),
};

export const FontWeights: Story = {
	render: () => (
		<div className="p-8 space-y-4">
			<h2 className="text-2xl font-bold mb-6">Font Weights</h2>
			<p className="font-normal">Normal (400) - Body text and paragraphs</p>
			<p className="font-medium">Medium (500) - Subtle emphasis</p>
			<p className="font-semibold">Semibold (600) - Subheadings</p>
			<p className="font-bold">Bold (700) - Headings and titles</p>
		</div>
	),
};
