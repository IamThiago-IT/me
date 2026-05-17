import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
	title: "Design Tokens/Colors",
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const colors = {
	background: { light: "oklch(1 0 0)", dark: "oklch(0.141 0.005 285.823)" },
	foreground: { light: "oklch(0.141 0.005 285.823)", dark: "oklch(0.985 0 0)" },
	card: { light: "oklch(1 0 0)", dark: "oklch(0.21 0.006 285.885)" },
	"card-foreground": { light: "oklch(0.141 0.005 285.823)", dark: "oklch(0.985 0 0)" },
	popover: { light: "oklch(1 0 0)", dark: "oklch(0.21 0.006 285.885)" },
	"popover-foreground": { light: "oklch(0.141 0.005 285.823)", dark: "oklch(0.985 0 0)" },
	primary: { light: "oklch(0.21 0.006 285.885)", dark: "oklch(0.92 0.004 286.32)" },
	"primary-foreground": { light: "oklch(0.985 0 0)", dark: "oklch(0.21 0.006 285.885)" },
	secondary: { light: "oklch(0.967 0.001 286.375)", dark: "oklch(0.274 0.006 286.033)" },
	"secondary-foreground": { light: "oklch(0.21 0.006 285.885)", dark: "oklch(0.985 0 0)" },
	muted: { light: "oklch(0.967 0.001 286.375)", dark: "oklch(0.274 0.006 286.033)" },
	"muted-foreground": { light: "oklch(0.552 0.016 285.938)", dark: "oklch(0.705 0.015 286.067)" },
	accent: { light: "oklch(0.967 0.001 286.375)", dark: "oklch(0.274 0.006 286.033)" },
	"accent-foreground": { light: "oklch(0.21 0.006 285.885)", dark: "oklch(0.985 0 0)" },
	destructive: { light: "oklch(0.577 0.245 27.325)", dark: "oklch(0.704 0.191 22.216)" },
	border: { light: "oklch(0.92 0.004 286.32)", dark: "oklch(1 0 0 / 10%)" },
	input: { light: "oklch(0.92 0.004 286.32)", dark: "oklch(1 0 0 / 15%)" },
	ring: { light: "oklch(0.705 0.015 286.067)", dark: "oklch(0.552 0.016 285.938)" },
};

export const Palette: Story = {
	render: () => {
		const [copied, setCopied] = useState<string | null>(null);

		const copyColor = (value: string) => {
			navigator.clipboard.writeText(value);
			setCopied(value);
			setTimeout(() => setCopied(null), 2000);
		};

		return (
			<div className="p-8">
				<h1 className="text-3xl font-bold mb-2">Color Palette</h1>
				<p className="text-muted-foreground mb-6">
					Base: <code className="bg-muted px-1.5 py-0.5 rounded">zinc</code> | Format:{" "}
					<code className="bg-muted px-1.5 py-0.5 rounded">OKLCH</code>
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{Object.entries(colors).map(([name, value]) => (
						<button
							key={name}
							onClick={() => copyColor(value.light)}
							className="group relative overflow-hidden rounded-lg border transition-all hover:shadow-md hover:scale-[1.02] text-left"
						>
							<div
								className="h-20 w-full border-b"
								style={{
									background: `oklch(${value.light})`,
									borderBottom:
										name === "background" || name === "card" || name === "popover"
											? "1px solid var(--border)"
											: "none",
								}}
							/>
							<div className="p-3">
								<p className="text-sm font-medium truncate">{name}</p>
								<p className="text-xs text-muted-foreground font-mono truncate mt-1">
									{value.light}
								</p>
							</div>
							{copied === value.light && (
								<div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
									Copied!
								</div>
							)}
						</button>
					))}
				</div>
			</div>
		);
	},
};

export const ChartColors: Story = {
	render: () => (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-4">Chart Colors</h2>
			<div className="flex gap-4">
				{["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"].map((name, i) => (
					<div
						key={name}
						className="flex-1 h-16 rounded-lg"
						style={{
							background: `oklch(${
								[
									"oklch(0.646 0.222 41.116)",
									"oklch(0.6 0.118 184.704)",
									"oklch(0.398 0.07 227.392)",
									"oklch(0.828 0.189 84.429)",
									"oklch(0.769 0.188 70.08)",
								][i]
							})`,
						}}
					/>
				))}
			</div>
		</div>
	),
};
