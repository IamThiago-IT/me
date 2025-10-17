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
        <main style={{ fontFamily: "Segoe UI, Roboto, system-ui, sans-serif", padding: 24 }}>
            <h1>My Setup</h1>

            <section aria-labelledby="setup-json" style={{ marginBottom: 16 }}>
                <h2 id="setup-json" style={{ fontSize: 16 }}>As JSON</h2>
                <pre style={{ background: "#f6f8fa", padding: 12, borderRadius: 6, overflow: "auto" }}>
                    {JSON.stringify(mySetup, null, 2)}
                </pre>
            </section>

            <section aria-labelledby="setup-hardware" style={{ marginBottom: 16 }}>
                <h2 id="setup-hardware" style={{ fontSize: 16 }}>Hardware</h2>
                <ul>
                    <li><strong>OS:</strong> {mySetup.os}</li>
                    <li><strong>CPU:</strong> {mySetup.cpu}</li>
                    <li><strong>RAM:</strong> {mySetup.ram}</li>
                </ul>
            </section>
            <section aria-labelledby="setup-software">
                <h2 id="setup-software" style={{ fontSize: 16 }}>Software</h2>
                <ul>
                    <li><strong>Editor:</strong> {mySetup.editor}</li>
                    <li><strong>Node:</strong> {mySetup.nodeVersion}</li>
                    <li><strong>Packages:</strong> {mySetup.packages.join(", ")}</li>
                    {mySetup.notes && <li><strong>Notes:</strong> {mySetup.notes}</li>}
                </ul>
            </section>
        </main>
    )
}