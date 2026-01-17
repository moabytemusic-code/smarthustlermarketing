const fs = require('fs');
const path = require('path');
const https = require('https');

// Paths
const LOCAL_MAPPING_PATH = path.join(__dirname, '../src/data/engineMapping.ts');
const SYNC_URL = 'https://api.signalengines.com/public/sync/engines';

async function syncEngines() {
    console.log('🔄 Checking SignalEngines.com for new updates...');

    try {
        const responseBlock = await fetchEngines();
        // The API returns { count: number, engines: [...] }
        const engines = responseBlock.engines;

        if (!engines || engines.length === 0) {
            console.log('⚠️ No engines found or API error.');
            return;
        }

        console.log(`✅ Found ${engines.length} active engines.`);

        // Read current local file
        let currentContent = fs.readFileSync(LOCAL_MAPPING_PATH, 'utf8');

        // Extract current ENGINE_DETAILS block to preserve other exports
        const currentDetailsMatch = currentContent.match(/export const ENGINE_DETAILS: Record<string, EngineDetail> = ({[\s\S]*?});/);

        if (!currentDetailsMatch) {
            console.error('❌ Could not parse local engineMapping.ts structure.');
            return;
        }

        // Generate new DETAILS object string
        const newDetailsObj = generateDetailsObject(engines);

        // Generate new EngineId Type
        const newTypeDefinition = generateTypeDefinition(engines);

        // Replace strictly the Type definition and the Details object
        // 1. Replace Type
        currentContent = currentContent.replace(
            /export type EngineId =\s*\|[^;]+;/s,
            newTypeDefinition
        );

        // 2. Replace Details
        currentContent = currentContent.replace(
            /export const ENGINE_DETAILS: Record<string, EngineDetail> = \{[\s\S]*?\};/s,
            `export const ENGINE_DETAILS: Record<string, EngineDetail> = ${newDetailsObj};`
        );

        fs.writeFileSync(LOCAL_MAPPING_PATH, currentContent);
        console.log('📝 Updated engineMapping.ts with latest definitions.');

    } catch (error) {
        console.error('❌ Sync failed:', error.message);
    }
}

function fetchEngines() {
    return new Promise((resolve, reject) => {
        https.get(SYNC_URL, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function generateTypeDefinition(engines) {
    const ids = engines.map(e => `    | '${e.id}'`).join('\n');
    return `export type EngineId =
${ids};`;
}

function generateDetailsObject(engines) {
    const lines = engines.map(e => {
        return `    "${e.id}": {
        title: "${e.name || e.title}",
        description: "${e.description || 'Automated diagnostic engine.'}"
    }`;
    });
    return `{\n${lines.join(',\n')}\n}`;
}

syncEngines();
