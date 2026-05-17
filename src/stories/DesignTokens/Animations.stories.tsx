import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Design Tokens/Animations",
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FadeInUp: Story = {
	render: () => (
		<div className="p-8 space-y-8">
			<div>
				<h1 className="text-3xl font-bold mb-2">Fade In Up</h1>
				<p className="text-muted-foreground">
					Entrance animation - 0.6s ease-out
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<div className="animate-fade-in-up bg-primary/10 px-6 py-3 rounded-lg">
					<p className="font-medium">Default fade-in-up</p>
				</div>
				<div className="animate-fade-in-up-1 bg-primary/10 px-6 py-3 rounded-lg">
					<p className="font-medium">Stagger 1 (0s delay)</p>
				</div>
				<div className="animate-fade-in-up-2 bg-primary/10 px-6 py-3 rounded-lg">
					<p className="font-medium">Stagger 2 (0.15s delay)</p>
				</div>
				<div className="animate-fade-in-up-3 bg-primary/10 px-6 py-3 rounded-lg">
					<p className="font-medium">Stagger 3 (0.3s delay)</p>
				</div>
			</div>
		</div>
	),
};

export const UnderlineAnimation: Story = {
	render: () => (
		<div className="p-8 space-y-8">
			<div>
				<h1 className="text-3xl font-bold mb-2">Underline Animation</h1>
				<p className="text-muted-foreground">
					Growing underline on hover - 0.8s ease-out 0.5s
				</p>
			</div>

			<div className="flex items-center gap-8 py-8">
				<span className="underline-animate text-2xl font-medium cursor-pointer">
					Hover me
				</span>
				<span className="underline-animate text-xl text-muted-foreground cursor-pointer">
					Secondary text
				</span>
			</div>
		</div>
	),
};

export const HoverEffects: Story = {
	render: () => (
		<div className="p-8 space-y-8">
			<div>
				<h1 className="text-3xl font-bold mb-2">Hover Effects</h1>
				<p className="text-muted-foreground">
					Scale and shadow transitions on hover
				</p>
			</div>

			<div className="flex flex-wrap gap-4">
				<button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg transition-all hover:scale-105 hover:shadow-lg">
					Scale + Shadow
				</button>
				<button className="px-6 py-3 bg-muted rounded-lg transition-colors hover:bg-primary hover:text-primary-foreground">
					Color Transition
				</button>
				<button className="px-6 py-3 border rounded-lg transition-all hover:border-primary hover:shadow-md">
					Border + Shadow
				</button>
			</div>
		</div>
	),
};

export const AnimationClasses: Story = {
	render: () => (
		<div className="p-8">
			<h2 className="text-2xl font-bold mb-4">Available Animation Classes</h2>
			<div className="space-y-2">
				<code className="block text-sm bg-muted p-2 rounded">.animate-fade-in-up</code>
				<code className="block text-sm bg-muted p-2 rounded">.animate-fade-in-up-1</code>
				<code className="block text-sm bg-muted p-2 rounded">.animate-fade-in-up-2</code>
				<code className="block text-sm bg-muted p-2 rounded">.animate-fade-in-up-3</code>
				<code className="block text-sm bg-muted p-2 rounded">.underline-animate</code>
			</div>
		</div>
	),
};
