"use client";

import DocLayout from "@/components/DocLayout";
import CodeBlock, { TerminalBlock } from "@/components/CodeBlock";
import { usePathname } from "next/navigation";

const VERIFY_OUTPUT = `$ npx a3stack verify eip155:8453:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432#2376

🔍 A3Stack — Identity Verifier

   Agent ID: eip155:8453:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432#2376

   Chain:    8453 (eip155)
   Registry: 0x8004A169FB4a3325136EB29fA0ceB6D2e539a432
   Token ID: 2376

📡 Querying on-chain...

   ✅ Identity verified!
   Owner:          0x1be93C...
   Payment wallet: (defaults to owner)

   📋 Registration File:
   Name:        Arca
   Description: AI agent infrastructure. Built by arcabot.ai.
   Active:      true
   x402 Pay:    true

   🔌 Services:
   - MCP: https://mcp.arcabot.ai/mcp (v2025-06-18)
   - web: https://arcabot.ai

   🌐 Cross-chain registrations:
   - eip155:1:0x8004...#88
   - eip155:42161:0x8004...#16
   [... 14 more chains]

   🔗 Endpoints:
   MCP: https://mcp.arcabot.ai/mcp
   A2A: (not configured)`;

const LOOKUP_OUTPUT = `$ npx a3stack lookup 0x1be93C...

🔍 Looking up agents for 0x1be93C... on Base...

   Found 1 agent:
   - #2376: Arca (active, x402 support)
     Global ID: eip155:8453:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432#2376`;

const PROBE_OUTPUT = `$ npx a3stack probe eip155:8453:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432#2376

🔭 Probing agent...

   Verified:        ✅
   Owner:           0x1be93C...
   MCP endpoint:    https://mcp.arcabot.ai/mcp
   Accepts payment: ✅
   
   Services:
   - MCP: https://mcp.arcabot.ai/mcp
   - web: https://arcabot.ai
   
   Cross-chain registrations: 23 chains (22 EVM + Solana)`;

const CHAINS_OUTPUT = `$ npx a3stack chains

   Supported ERC-8004 EVM chains
   
   Chain ID     Name            
   ───────────  ────────────────
   1            Ethereum        
   10           Optimism        
   56           BNB Chain       
   100          Gnosis          
   137          Polygon         
   143          Monad           
   196          X Layer         
   360          Shape           
   1088         Metis           
   1776         Injective EVM   
   2345         GOAT Network    
   2741         Abstract        
   4326         MegaETH         
   5000         Mantle          
   8453         Base            
   42161        Arbitrum        
   42220        Celo            
   43114        Avalanche       
   59144        Linea           
   167000       Taiko           
   534352       Scroll          
   1187947933   SKALE Base      

   22 chains — same registry address on all.`;

const COUNT_OUTPUT = `$ npx a3stack count

   ERC-8004 Registry on Base
   Total registered agents: 2,381`;

const INIT_OUTPUT = `$ npx a3stack init

🚀 A3Stack Project Setup

? Project name: my-agent
? Use TypeScript? Yes
? Install dependencies? Yes

✅ Created my-agent/
   ├── agent.ts
   ├── package.json
   └── tsconfig.json

Next steps:
  cd my-agent
  npm install
  PRIVATE_KEY=0x... npx tsx agent.ts`;

export default function CliPage() {
  const pathname = usePathname();

  return (
    <DocLayout
      title="CLI"
      description="The npx a3stack CLI for verifying agents, exploring the registry, and scaffolding new projects — no wallet needed for most commands."
      currentPath={pathname}
      pill={{ label: "npx a3stack", color: "gold" }}
    >
      <h2>Overview</h2>
      <p>
        The <code>a3stack</code> CLI ships as part of the <code>a3stack</code> npm package.
        Most commands are read-only and require no wallet or private key.
      </p>
      <TerminalBlock code="npx a3stack --help" />

      <div style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "8px 24px",
        padding: "20px 24px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        marginBottom: 32,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        alignItems: "start",
      }}>
        {[
          ["verify <globalId>", "Verify an agent's on-chain identity"],
          ["lookup <address>", "Find all agents registered by a wallet"],
          ["probe <globalId>", "Probe an agent's capabilities and endpoints"],
          ["chains", "List all 22 supported EVM chains"],
          ["count", "Show total registered agents on Base"],
          ["init", "Scaffold a new A3Stack project"],
        ].map(([cmd, desc]) => (
          <>
            <span key={cmd} style={{ color: "#fbbf24" }}>{cmd}</span>
            <span key={desc} style={{ color: "#64748b" }}>{desc}</span>
          </>
        ))}
      </div>

      <h2>verify</h2>
      <p>
        Verify any agent's identity. Reads from the ERC-8004 registry, fetches the registration file,
        and validates the back-reference. No wallet needed.
      </p>
      <TerminalBlock code="npx a3stack verify eip155:8453:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432#2376" />
      <CodeBlock code={VERIFY_OUTPUT} lang="text" />

      <h2>lookup</h2>
      <p>Find all ERC-8004 registrations for a wallet address on Base.</p>
      <TerminalBlock code="npx a3stack lookup 0x1be93C..." />
      <CodeBlock code={LOOKUP_OUTPUT} lang="text" />

      <h2>probe</h2>
      <p>
        Probe an agent — combines identity verification with endpoint resolution.
        Shows what tools are available and whether the agent accepts payments.
      </p>
      <TerminalBlock code="npx a3stack probe eip155:8453:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432#2376" />
      <CodeBlock code={PROBE_OUTPUT} lang="text" />

      <h2>chains</h2>
      <p>List all chains where the ERC-8004 registry is deployed.</p>
      <TerminalBlock code="npx a3stack chains" />
      <CodeBlock code={CHAINS_OUTPUT} lang="text" />

      <h2>count</h2>
      <p>Show the current total of registered agents on Base.</p>
      <TerminalBlock code="npx a3stack count" />
      <CodeBlock code={COUNT_OUTPUT} lang="text" />

      <h2>init</h2>
      <p>Scaffold a new A3Stack project with TypeScript, example agent, and package.json.</p>
      <TerminalBlock code="npx a3stack init" />
      <CodeBlock code={INIT_OUTPUT} lang="text" />

      <h2>Installing globally</h2>
      <p>You can also install the CLI globally for convenience:</p>
      <TerminalBlock code={`npm install -g a3stack\na3stack verify eip155:8453:0x8004...#2376`} />
    </DocLayout>
  );
}
