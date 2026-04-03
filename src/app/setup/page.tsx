// /d:/www/temp/me/src/app/setup/page.tsx
type Setup = {
    os: string
    cpu: string
    ram: string
    editor: string
    nodeVersion: string
    packages: string[]
    notes?: string
}

const mySetup: Setup = {
    os: "Windows 11",
    cpu: "Intel Core i7-10750H",
    ram: "16 GB",
    editor: "VS Code",
    nodeVersion: "v18.16.0",
    packages: ["react", "next", "typescript"],
    notes: "Development machine for web apps"
}

export default function Page() {
    return (
        <main className="p-6 sm:p-8 md:p-10 font-[Segoe_UI,Roboto,system-ui,sans-serif]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">My Setup</h1>

            <section aria-labelledby="setup-json" className="mb-6 sm:mb-8">
                <h2 id="setup-json" className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">As JSON</h2>
                <pre className="bg-slate-100 dark:bg-slate-800 p-3 sm:p-4 rounded-md sm:rounded-lg overflow-auto text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    {JSON.stringify(mySetup, null, 2)}
                </pre>
            </section>

            <section aria-labelledby="setup-hardware" className="mb-6 sm:mb-8">
                <h2 id="setup-hardware" className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Hardware</h2>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                    <li><strong>OS:</strong> {mySetup.os}</li>
                    <li><strong>CPU:</strong> {mySetup.cpu}</li>
                    <li><strong>RAM:</strong> {mySetup.ram}</li>
                </ul>
            </section>
            <section aria-labelledby="setup-software">
                <h2 id="setup-software" className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Software</h2>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                    <li><strong>Editor:</strong> {mySetup.editor}</li>
                    <li><strong>Node:</strong> {mySetup.nodeVersion}</li>
                    <li><strong>Packages:</strong> {mySetup.packages.join(", ")}</li>
                    {mySetup.notes && <li><strong>Notes:</strong> {mySetup.notes}</li>}
                </ul>
            </section>
        </main>
    )
}