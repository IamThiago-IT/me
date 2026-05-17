import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Design Tokens/Spacing",
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const spacingScale = [
	{ name: "0.5", value: "0.125rem", pixels: "2px", tw: "space-0.5" },
	{ name: "1", value: "0.25rem", pixels: "4px", tw: "space-1" },
	{ name: "2", value: "0.5rem", pixels: "8px", tw: "space-2" },
	{ name: "3", value: "0.75rem", pixels: "12px", tw: "space-3" },
	{ name: "4", value: "1rem", pixels: "16px", tw: "space-4" },
	{ name: "5", value: "1.25rem", pixels: "20px", tw: "space-5" },
	{ name: "6", value: "1.5rem", pixels: "24px", tw: "space-6" },
	{ name: "8", value: "2rem", pixels: "32px", tw: "space-8" },
	{ name: "10", value: "2.5rem", pixels: "40px", tw: "space-10" },
	{ name: "12", value: "3rem", pixels: "48px", tw: "space-12" },
	{ name: "16", value: "4rem", pixels: "64px", tw: "space-16" },
];

export const Scale: Story = {
	render: () => (
		<div className="p-8 space-y-8">
			<div>
				<h1 className="text-3xl font-bold mb-2">Spacing Scale</h1>
				<p className="text-muted-foreground">
					Sistema de espaçamento baseado em rem units
				</p>
			</div>

			<div className="space-y-4">
				{spacingScale.map((item) => (
					<div key={item.name} className="grid grid-cols-12 gap-4 items-center">
						<div className="col-span-2">
							<code className="text-sm font-medium">{item.tw}</code>
						</div>
						<div className="col-span-3">
							<span className="text-sm text-muted-foreground">{item.value}</span>
						</div>
						<div className="col-span-2">
							<span className="text-xs text-muted-foreground">{item.pixels}</span>
						</div>
						<div className="col-span-5">
							<div
								className="h-6 bg-primary/20 rounded"
								style={{ width: `calc(${item.value} * 4)` }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	),
};

export const ContainerWidths: Story = {
	render: () => (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-4">Container Max Widths</h2>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				<div className="p-4 border rounded-lg">
					<code className="text-xs">max-w-4xl</code>
					<p className="text-sm text-muted-foreground mt-1">56rem (896px)</p>
				</div>
				<div className="p-4 border rounded-lg">
					<code className="text-xs">max-w-6xl</code>
					<p className="text-sm text-muted-foreground mt-1">72rem (1152px)</p>
				</div>
				<div className="p-4 border rounded-lg">
					<code className="text-xs">max-w-7xl</code>
					<p className="text-sm text-muted-foreground mt-1">80rem (1280px)</p>
				</div>
				<div className="p-4 border rounded-lg">
					<code className="text-xs">max-w-2xl</code>
					<p className="text-sm text-muted-foreground mt-1">42rem (672px)</p>
				</div>
			</div>
		</div>
	),
};
