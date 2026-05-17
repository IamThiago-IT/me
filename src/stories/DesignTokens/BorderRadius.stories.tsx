import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Design Tokens/BorderRadius",
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const radiusScale = [
	{ name: "sm", value: "calc(var(--radius) - 4px)", pixels: "~2.25px", tw: "rounded-sm" },
	{ name: "md", value: "calc(var(--radius) - 2px)", pixels: "~4.25px", tw: "rounded-md" },
	{ name: "lg", value: "var(--radius)", pixels: "10px", tw: "rounded-lg" },
	{ name: "xl", value: "calc(var(--radius) + 4px)", pixels: "~14px", tw: "rounded-xl" },
];

export const Scale: Story = {
	render: () => (
		<div className="p-8 space-y-8">
			<div>
				<h1 className="text-3xl font-bold mb-2">Border Radius</h1>
				<p className="text-muted-foreground">
					Base radius: <code className="bg-muted px-1.5 py-0.5 rounded">0.625rem (10px)</code>
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{radiusScale.map((item) => (
					<div key={item.name} className="space-y-3">
						<div
							className={`h-24 w-24 bg-primary/20 border-2 border-primary/40 ${item.tw}`}
						/>
						<div>
							<p className="font-medium">{item.name}</p>
							<p className="text-sm text-muted-foreground">{item.pixels}</p>
							<code className="text-xs bg-muted px-1.5 py-0.5 rounded mt-1 block">
								{item.tw}
							</code>
						</div>
					</div>
				))}
			</div>
		</div>
	),
};
