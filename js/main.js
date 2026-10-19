// Solar System Explorer - main script
// Loaded as a normal script (not type="module") so the site also works when
// index.html is opened directly by double-clicking it (file://).
(async () => {
    const THREE = await import('three');


    // ─── Planet Data ────────────────────────────────────────────
    const planets = [
        {
            name: 'Sun',
            label: 'The Star',
            radius: 4.0,
            texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Map_of_the_full_sun.jpg/1280px-Map_of_the_full_sun.jpg',
            color: '#FDB813',
            emissive: '#FF8C00',
            emissiveIntensity: 2.5,
            isStar: true,
            rotationSpeed: 0.001,
            stats: { diameter: '1.39M km', temp: '5,500°C', type: 'G-Type Star', age: '4.6B yrs' },
            desc: 'The Sun contains 99.86% of the mass in our solar system. A massive sphere of hot plasma, it fuses 600 million tons of hydrogen into helium every second, powering all life on Earth.',
            align: 'left'
        },
        {
            name: 'Mercury',
            label: 'Planet I',
            radius: 0.38,
            texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Mercury_map_by_MESSENGER_global_mosaic_enhancedcolor_with_key.jpg/1280px-Mercury_map_by_MESSENGER_global_mosaic_enhancedcolor_with_key.jpg',
            color: '#8C7E6D',
            rotationSpeed: 0.003,
            tilt: 0.03,
            stats: { diameter: '4,879 km', orbit: '88 days', temp: '−180/430°C', moons: '0' },
            desc: 'The smallest planet and closest to the Sun. Despite its proximity, Mercury is not the hottest planet. Its lack of atmosphere creates extreme temperature swings between day and night.',
            align: 'right'
        },
        {
            name: 'Venus',
            label: 'Planet II',
            radius: 0.62,
            texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Venus_Magellan_C3-MDIR_colorized_global_map.jpg/1280px-Venus_Magellan_C3-MDIR_colorized_global_map.jpg',
            color: '#E8CDA0',
            rotationSpeed: -0.002,
            tilt: 2.64,
            atmosphere: { color: '#e8b84a', opacity: 0.2 },
            stats: { diameter: '12,104 km', orbit: '225 days', temp: '465°C', moons: '0' },
            desc: 'Often called Earth\'s twin for its similar size, Venus rotates backwards and has a crushing atmosphere 90 times denser than Earth\'s. Its surface is hot enough to melt lead.',
            align: 'left'
        },
        {
            name: 'Earth',
            label: 'Planet III',
            radius: 0.65,
            texture: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
            normalMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
            specularMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
            clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
            color: '#4A90D9',
            rotationSpeed: 0.003,
            tilt: 0.41,
            atmosphere: { color: '#4A90D9', opacity: 0.15 },
            stats: { diameter: '12,742 km', orbit: '365 days', temp: '15°C avg', moons: '1' },
            desc: 'Our home world — the only known planet to harbor life. Its liquid water, magnetic field, and perfect distance from the Sun create the ideal conditions for complex ecosystems.',
            align: 'right'
        },
        {
            name: 'Mars',
            label: 'Planet IV',
            radius: 0.5,
            texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Mars_Hubble.jpg/1280px-Mars_Hubble.jpg',
            color: '#C1440E',
            rotationSpeed: 0.003,
            tilt: 0.44,
            atmosphere: { color: '#C1440E', opacity: 0.08 },
            stats: { diameter: '6,779 km', orbit: '687 days', temp: '−60°C avg', moons: '2' },
            desc: 'The Red Planet, colored by iron oxide dust. Mars hosts the tallest volcano and deepest canyon in the solar system. It\'s humanity\'s primary target for future colonization.',
            align: 'left'
        },
        {
            name: 'Jupiter',
            label: 'Planet V',
            radius: 2.2,
            texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Jupiter_New_Horizons.jpg/1280px-Jupiter_New_Horizons.jpg',
            color: '#C88B3A',
            rotationSpeed: 0.005,
            tilt: 0.05,
            atmosphere: { color: '#C88B3A', opacity: 0.12 },
            stats: { diameter: '139,820 km', orbit: '12 years', temp: '−110°C', moons: '95' },
            desc: 'The king of planets — so massive it could fit all other planets inside it. Jupiter\'s Great Red Spot is a storm larger than Earth that has raged for over 350 years.',
            align: 'right'
        },
        {
            name: 'Saturn',
            label: 'Planet VI',
            radius: 1.8,
            texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Saturn_Storm.jpg/1280px-Saturn_Storm.jpg',
            color: '#E8D5A3',
            rotationSpeed: 0.004,
            tilt: 0.47,
            hasRings: true,
            ringColor: '#D4B896',
            stats: { diameter: '116,460 km', orbit: '29 years', temp: '−140°C', moons: '146' },
            desc: 'Famous for its stunning ring system made of ice and rock particles. Saturn is the least dense planet — it would float in water if you could find a bathtub large enough.',
            align: 'left'
        },
        {
            name: 'Uranus',
            label: 'Planet VII',
            radius: 1.1,
            procedural: 'uranus',
            color: '#73B8C4',
            rotationSpeed: -0.003,
            tilt: 1.71,
            atmosphere: { color: '#73C4D4', opacity: 0.18 },
            hasRings: true,
            ringColor: '#5599aa',
            stats: { diameter: '50,724 km', orbit: '84 years', temp: '−195°C', moons: '28' },
            desc: 'The ice giant that rolls around the Sun on its side, likely knocked over by a massive collision. Its blue-green color comes from methane in its atmosphere.',
            align: 'right'
        },
        {
            name: 'Neptune',
            label: 'Planet VIII',
            radius: 1.05,
            procedural: 'neptune',
            color: '#3E54A3',
            rotationSpeed: 0.003,
            tilt: 0.49,
            atmosphere: { color: '#3E54A3', opacity: 0.2 },
            stats: { diameter: '49,244 km', orbit: '165 years', temp: '−200°C', moons: '16' },
            desc: 'The most distant planet, with the strongest winds in the solar system reaching 2,100 km/h. Neptune\'s vivid blue comes from methane absorbing red light.',
            align: 'left'
        }
    ];

    // ─── Scene Setup (preserving reference code structure) ──────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    document.getElementById('scene-container').appendChild(renderer.domElement);

    // ─── Lighting (preserving reference code setup) ─────────────
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xFFF5E0, 3, 0, 0.5);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x4466ff, 0.15);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    // ─── Texture Loader ─────────────────────────────────────────
    const textureLoader = new THREE.TextureLoader();
    // Simple procedural texture used when an image fails or takes too long,
    // so a planet still looks like a planet instead of a plain white ball.
    function makeFallbackTexture(color) {
        const c = document.createElement('canvas');
        c.width = 512; c.height = 256;
        const ctx = c.getContext('2d');
        const base = new THREE.Color(color || '#888888');
        for (let y = 0; y < c.height; y++) {
            const band = 0.75 + 0.25 * Math.sin(y * 0.09) + 0.1 * Math.sin(y * 0.31);
            const k = Math.max(0.3, Math.min(1.2, band));
            ctx.fillStyle = `rgb(${Math.floor(base.r * 255 * k)},${Math.floor(base.g * 255 * k)},${Math.floor(base.b * 255 * k)})`;
            ctx.fillRect(0, y, c.width, 1);
        }
        for (let i = 0; i < 1500; i++) {
            ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.12})`;
            ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 2 + Math.random() * 6, 1 + Math.random() * 3);
        }
        const tex = new THREE.CanvasTexture(c);
        return tex;
    }

    // Smooth banded texture for the ice giants (Uranus / Neptune).
    function makeIceGiantTexture(kind) {
        const W = 1024, H = 512;
        const c = document.createElement('canvas');
        c.width = W; c.height = H;
        const ctx = c.getContext('2d');
        const isNep = kind === 'neptune';
        const top = isNep ? [22, 58, 190] : [110, 196, 212];
        const mid = isNep ? [45, 100, 235] : [140, 218, 228];
        for (let y = 0; y < H; y++) {
            const lat = y / H;                       // 0 = north pole, 1 = south pole
            const t = Math.sin(lat * Math.PI);       // brighter towards the equator
            const band = isNep
                ? 0.08 * Math.sin(lat * 38) + 0.05 * Math.sin(lat * 91 + 1.3)
                : 0.03 * Math.sin(lat * 30) + 0.02 * Math.sin(lat * 70);
            const k = 1 + band;
            const r = (top[0] + (mid[0] - top[0]) * t) * k;
            const g = (top[1] + (mid[1] - top[1]) * t) * k;
            const b = (top[2] + (mid[2] - top[2]) * t) * k;
            ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
            ctx.fillRect(0, y, W, 1);
        }
        // soft streaky clouds
        ctx.globalAlpha = isNep ? 0.10 : 0.05;
        for (let i = 0; i < 260; i++) {
            const y = Math.random() * H;
            ctx.fillStyle = Math.random() < 0.5 ? '#ffffff' : (isNep ? '#1a2f80' : '#7fb8c4');
            ctx.fillRect(Math.random() * W, y, 60 + Math.random() * 260, 1 + Math.random() * 3);
        }
        ctx.globalAlpha = 1;
        if (isNep) {
            // Great Dark Spot with bright companion clouds
            const sx = W * 0.35, sy = H * 0.62;
            const g = ctx.createRadialGradient(sx, sy, 2, sx, sy, 48);
            g.addColorStop(0, 'rgba(12,24,80,0.85)');
            g.addColorStop(1, 'rgba(12,24,80,0)');
            ctx.save(); ctx.translate(sx, sy); ctx.scale(1.8, 1); ctx.translate(-sx, -sy);
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(sx, sy, 48, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
            ctx.fillStyle = 'rgba(235,245,255,0.7)';
            ctx.fillRect(sx - 30, sy - 34, 70, 3);
            ctx.fillRect(W * 0.62, H * 0.42, 50, 2);
            ctx.fillRect(W * 0.70, H * 0.71, 34, 2);
        }
        return new THREE.CanvasTexture(c);
    }

    const TEXTURE_TIMEOUT_MS = 10000;
    const textureCache = new Map();

    // Loads a texture but never hangs: resolves with null on error or timeout.
    function loadTex(url) {
        if (textureCache.has(url)) return textureCache.get(url);
        const p = new Promise(resolve => {
            let done = false;
            const finish = tex => {
                if (done) return;
                done = true;
                resolve(tex);
            };
            const timer = setTimeout(() => {
                console.warn('Texture timed out, using fallback:', url);
                finish(null);
            }, TEXTURE_TIMEOUT_MS);
            textureLoader.load(
                url,
                tex => { clearTimeout(timer); finish(tex); },
                undefined,
                () => { clearTimeout(timer); console.warn('Texture failed, using fallback:', url); finish(null); }
            );
        });
        textureCache.set(url, p);
        return p;
    }

    // Start every download at once (in parallel) instead of one after another.
    planets.forEach(p => {
        [p.texture, p.normalMap, p.specularMap, p.clouds].filter(Boolean).forEach(loadTex);
    });

    // ─── Starfield (preserving reference code approach) ─────────
    function createStarfield() {
        const geo = new THREE.BufferGeometry();
        const verts = [], colors = [];
        for (let i = 0; i < 20000; i++) {
            const r = 3000 + Math.random() * 7000;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            verts.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
            const c = new THREE.Color();
            c.setHSL(Math.random() * 0.2 + 0.55, 0.5, 0.7 + Math.random() * 0.3);
            colors.push(c.r, c.g, c.b);
        }
        geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
        geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const mat = new THREE.PointsMaterial({ size: 1.5, transparent: true, opacity: 0.9, sizeAttenuation: true, vertexColors: true });
        return new THREE.Points(geo, mat);
    }
    scene.add(createStarfield());

    // Background dust / nebula particles
    function createDustField() {
        const geo = new THREE.BufferGeometry();
        const verts = [], colors = [];
        for (let i = 0; i < 3000; i++) {
            const spread = 6000;
            verts.push((Math.random() - 0.5) * spread, (Math.random() - 0.5) * spread * 0.3, (Math.random() - 0.5) * spread);
            const c = new THREE.Color();
            c.setHSL(0.6 + Math.random() * 0.15, 0.3, 0.15 + Math.random() * 0.1);
            colors.push(c.r, c.g, c.b);
        }
        geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
        geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const mat = new THREE.PointsMaterial({ size: 3, transparent: true, opacity: 0.25, sizeAttenuation: true, vertexColors: true, blending: THREE.AdditiveBlending });
        return new THREE.Points(geo, mat);
    }
    scene.add(createDustField());

    // ─── Build Planets ──────────────────────────────────────────
    const planetObjects = [];
    const sectionSpacing = 80;

    async function buildSolarSystem() {
        for (let i = 0; i < planets.length; i++) {
            const data = planets[i];
            const group = new THREE.Group();
            const z = -i * sectionSpacing;
            group.position.set(0, 0, z);

            // Start with a drawn texture so the planet shows right away;
            // real photo textures replace it as soon as they finish downloading.
            const mainTex = data.procedural ? makeIceGiantTexture(data.procedural) : makeFallbackTexture(data.color);
            const normTex = null, specTex = null;

            // Sphere geometry - high resolution
            const geo = new THREE.SphereGeometry(data.radius, 128, 128);
            let mat;

            if (data.isStar) {
                mat = new THREE.MeshStandardMaterial({
                    map: mainTex,
                    emissive: new THREE.Color(data.emissive),
                    emissiveIntensity: data.emissiveIntensity,
                    emissiveMap: mainTex,
                    roughness: 1,
                    metalness: 0
                });
            } else {
                mat = new THREE.MeshPhongMaterial({
                    map: mainTex,
                    normalMap: normTex,
                    normalScale: new THREE.Vector2(0.8, 0.8),
                    specularMap: specTex,
                    shininess: 25,
                    specular: new THREE.Color(0x111111)
                });
                if (data.procedural) {
                    // Uranus / Neptune sit far from the light, so let their colour glow a little
                    mat.emissive = new THREE.Color(0xffffff);
                    mat.emissiveMap = mainTex;
                    mat.emissiveIntensity = 0.22;
                }
            }

            if (data.texture) {
                loadTex(data.texture).then(tex => {
                    if (!tex) return;
                    mat.map = tex;
                    if (data.isStar) mat.emissiveMap = tex;
                    mat.needsUpdate = true;
                });
            }
            if (data.normalMap) {
                loadTex(data.normalMap).then(tex => {
                    if (!tex) return;
                    mat.normalMap = tex;
                    mat.needsUpdate = true;
                });
            }
            if (data.specularMap) {
                loadTex(data.specularMap).then(tex => {
                    if (!tex) return;
                    mat.specularMap = tex;
                    mat.shininess = 100;
                    mat.specular = new THREE.Color(0x333333);
                    mat.needsUpdate = true;
                });
            }

            const mesh = new THREE.Mesh(geo, mat);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (data.tilt) mesh.rotation.z = data.tilt;
            group.add(mesh);

            // Sun glow
            if (data.isStar) {
                const glowGeo = new THREE.SphereGeometry(data.radius * 1.15, 64, 64);
                const glowMat = new THREE.ShaderMaterial({
                    vertexShader: `
                        varying vec3 vNormal;
                        void main() {
                            vNormal = normalize(normalMatrix * normal);
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        varying vec3 vNormal;
                        void main() {
                            float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
                            gl_FragColor = vec4(1.0, 0.7, 0.2, 1.0) * intensity * 1.5;
                        }
                    `,
                    blending: THREE.AdditiveBlending,
                    side: THREE.BackSide,
                    transparent: true
                });
                group.add(new THREE.Mesh(glowGeo, glowMat));

                // Corona
                const coronaGeo = new THREE.SphereGeometry(data.radius * 1.6, 32, 32);
                const coronaMat = new THREE.ShaderMaterial({
                    vertexShader: `
                        varying vec3 vNormal;
                        void main() {
                            vNormal = normalize(normalMatrix * normal);
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        varying vec3 vNormal;
                        void main() {
                            float intensity = pow(0.45 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
                            gl_FragColor = vec4(1.0, 0.55, 0.1, 1.0) * intensity * 0.4;
                        }
                    `,
                    blending: THREE.AdditiveBlending,
                    side: THREE.BackSide,
                    transparent: true
                });
                group.add(new THREE.Mesh(coronaGeo, coronaMat));

                // Point light at sun
                const sunPt = new THREE.PointLight(0xFFF0D0, 5, sectionSpacing * planets.length, 0.3);
                group.add(sunPt);
            }

            // Atmosphere (preserving reference code shader approach)
            if (data.atmosphere) {
                const atmosGeo = new THREE.SphereGeometry(data.radius * 1.02, 64, 64);
                const ac = new THREE.Color(data.atmosphere.color);
                const atmosMat = new THREE.ShaderMaterial({
                    vertexShader: `
                        varying vec3 vNormal;
                        varying vec3 vPosition;
                        void main() {
                            vNormal = normalize(normalMatrix * normal);
                            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        varying vec3 vNormal;
                        varying vec3 vPosition;
                        uniform vec3 uColor;
                        uniform float uOpacity;
                        void main() {
                            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                            gl_FragColor = vec4(uColor, 1.0) * intensity * uOpacity * 3.0;
                        }
                    `,
                    uniforms: {
                        uColor: { value: ac },
                        uOpacity: { value: data.atmosphere.opacity }
                    },
                    blending: THREE.AdditiveBlending,
                    side: THREE.BackSide,
                    transparent: true
                });
                group.add(new THREE.Mesh(atmosGeo, atmosMat));
            }

            // Clouds layer (Earth)
            if (data.clouds) {
                const cloudGeo = new THREE.SphereGeometry(data.radius * 1.008, 64, 64);
                const cloudMat = new THREE.MeshPhongMaterial({
                    transparent: true,
                    opacity: 0.35,
                    depthWrite: false,
                    color: 0xffffff
                });
                const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
                cloudMesh.name = 'clouds';
                cloudMesh.visible = false;   // shown once the cloud image has loaded
                loadTex(data.clouds).then(tex => {
                    if (!tex) return;
                    cloudMat.map = tex;
                    cloudMat.needsUpdate = true;
                    cloudMesh.visible = true;
                });
                group.add(cloudMesh);
            }

            // Saturn / Uranus rings
            if (data.hasRings) {
                const innerR = data.radius * 1.3;
                const outerR = data.name === 'Saturn' ? data.radius * 2.4 : data.radius * 1.8;
                const ringGeo = new THREE.RingGeometry(innerR, outerR, 128);
                // Fix UV mapping for ring texture
                const pos = ringGeo.attributes.position;
                const uv = ringGeo.attributes.uv;
                for (let j = 0; j < pos.count; j++) {
                    const x = pos.getX(j), y = pos.getY(j);
                    const dist = Math.sqrt(x * x + y * y);
                    uv.setXY(j, (dist - innerR) / (outerR - innerR), 0.5);
                }

                // Generate procedural ring texture
                const ringCanvas = document.createElement('canvas');
                ringCanvas.width = 1024; ringCanvas.height = 64;
                const rctx = ringCanvas.getContext('2d');
                const baseColor = new THREE.Color(data.ringColor);
                for (let x = 0; x < 1024; x++) {
                    const t = x / 1024;
                    const gaps = Math.sin(t * 80) * 0.3 + Math.sin(t * 200) * 0.15 + Math.sin(t * 30) * 0.2;
                    const alpha = Math.max(0, 0.4 + gaps) * (1 - Math.pow(2 * t - 1, 4));
                    const brightness = 0.7 + Math.random() * 0.3;
                    rctx.fillStyle = `rgba(${Math.floor(baseColor.r*255*brightness)},${Math.floor(baseColor.g*255*brightness)},${Math.floor(baseColor.b*255*brightness)},${alpha})`;
                    rctx.fillRect(x, 0, 1, 64);
                }
                const ringTex = new THREE.CanvasTexture(ringCanvas);

                const ringMat = new THREE.MeshPhongMaterial({
                    map: ringTex,
                    transparent: true,
                    side: THREE.DoubleSide,
                    depthWrite: false,
                    opacity: 0.85
                });
                const ringMesh = new THREE.Mesh(ringGeo, ringMat);
                ringMesh.rotation.x = -Math.PI / 2 + (data.tilt || 0);
                ringMesh.name = 'ring';
                group.add(ringMesh);
            }

            // Side light for each planet
            if (!data.isStar) {
                const pl = new THREE.PointLight(new THREE.Color(data.color), 0.6, data.radius * 15);
                pl.position.set(data.radius * 3, data.radius * 2, data.radius * 2);
                group.add(pl);
            }

            scene.add(group);
            planetObjects.push({ group, mesh, data, z });
        }
    }

    // ─── Scroll Setup ───────────────────────────────────────────
    function buildScrollSections() {
        const container = document.getElementById('scroll-container');
        const progressBar = document.getElementById('progress-bar');

        planets.forEach((data, i) => {
            // Section
            const section = document.createElement('div');
            section.className = 'section';
            section.id = `section-${i}`;

            const panel = document.createElement('div');
            panel.className = `info-panel${data.align === 'right' ? ' right-align' : ''}`;
            panel.id = `panel-${i}`;

            const statKeys = Object.keys(data.stats);
            const statsHTML = statKeys.map(k => `
                <div class="stat">
                    <div class="stat-value">${data.stats[k]}</div>
                    <div class="stat-label">${k}</div>
                </div>
            `).join('');

            panel.innerHTML = `
                <div class="planet-label">${data.label}</div>
                <div class="planet-name">${data.name}</div>
                <div class="planet-divider" style="background: ${data.color};"></div>
                <div class="planet-stats">${statsHTML}</div>
                <p class="planet-desc">${data.desc}</p>
            `;

            section.appendChild(panel);
            container.appendChild(section);

            // Progress dot
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            dot.dataset.name = data.name;
            dot.addEventListener('click', () => {
                window.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' });
            });
            progressBar.appendChild(dot);
        });
    }

    // ─── Camera Path & Scroll Handling ──────────────────────────
    let scrollProgress = 0;
    let targetScroll = 0;
    let currentScroll = 0;

    function updateScroll() {
        const maxScroll = (planets.length - 1) * window.innerHeight;
        targetScroll = window.scrollY / maxScroll;
        targetScroll = Math.max(0, Math.min(1, targetScroll));
    }

    window.addEventListener('scroll', updateScroll, { passive: true });

    function getCameraPosition(t) {
        const totalSections = planets.length - 1;
        const rawIndex = t * totalSections;
        const i = Math.floor(rawIndex);
        const frac = rawIndex - i;
        const idx = Math.min(i, totalSections);
        const nextIdx = Math.min(idx + 1, totalSections);

        const currPlanet = planets[idx];
        const nextPlanet = planets[nextIdx];

        // Position camera in front of and slightly offset from each planet
        const viewDist = currPlanet.radius * 2.8 + 1.2;
        const nextViewDist = nextPlanet.radius * 2.8 + 1.2;

        const offsetX = currPlanet.align === 'right' ? -currPlanet.radius * 0.6 : currPlanet.radius * 0.6;
        const nextOffsetX = nextPlanet.align === 'right' ? -nextPlanet.radius * 0.6 : nextPlanet.radius * 0.6;

        // Smooth easing
        const ease = frac < 0.5 ? 2 * frac * frac : 1 - Math.pow(-2 * frac + 2, 2) / 2;

        const z1 = -idx * sectionSpacing + viewDist;
        const z2 = -nextIdx * sectionSpacing + nextViewDist;

        const x = THREE.MathUtils.lerp(offsetX, nextOffsetX, ease);
        const y = THREE.MathUtils.lerp(currPlanet.radius * 0.2, nextPlanet.radius * 0.2, ease);
        const z = THREE.MathUtils.lerp(z1, z2, ease);

        // Look target
        const lookZ1 = -idx * sectionSpacing;
        const lookZ2 = -nextIdx * sectionSpacing;
        const lookZ = THREE.MathUtils.lerp(lookZ1, lookZ2, ease);
        const lookX = THREE.MathUtils.lerp(offsetX * 0.3, nextOffsetX * 0.3, ease);

        return {
            pos: new THREE.Vector3(x, y, z),
            look: new THREE.Vector3(lookX, 0, lookZ),
            currentIndex: idx,
            frac: ease
        };
    }

    // ─── Animation Loop (preserving reference code structure) ───
    let time = 0;
    const clock = new THREE.Clock();
    let currentLook = new THREE.Vector3();
    let currentPos = new THREE.Vector3(0, 0, planets[0].radius * 2.8 + 1.2);
    camera.position.copy(currentPos);

    function animate() {
        requestAnimationFrame(animate);
        const dt = clock.getDelta();
        time += dt;

        // Smooth scroll interpolation
        currentScroll += (targetScroll - currentScroll) * 0.06;

        const cam = getCameraPosition(currentScroll);

        // Smooth camera movement
        currentPos.lerp(cam.pos, 0.08);
        currentLook.lerp(cam.look, 0.08);
        camera.position.copy(currentPos);
        camera.lookAt(currentLook);

        // Rotate planets
        planetObjects.forEach(({ mesh, data, group }) => {
            mesh.rotation.y += data.rotationSpeed;

            // Rotate clouds
            const clouds = group.getObjectByName('clouds');
            if (clouds) {
                clouds.rotation.y += data.rotationSpeed * 1.15;
            }
        });

        // Update sun light position to follow camera slightly
        sunLight.position.set(currentPos.x + 5, currentPos.y + 3, planetObjects[0] ? planetObjects[0].z : 0);

        // Update info panels
        const activeIdx = cam.currentIndex;
        const panels = document.querySelectorAll('.info-panel');
        panels.forEach((p, i) => {
            const sectionTop = i * window.innerHeight;
            const scrollY = window.scrollY;
            const diff = Math.abs(scrollY - sectionTop);
            if (diff < window.innerHeight * 0.5) {
                p.classList.add('visible');
            } else {
                p.classList.remove('visible');
            }
        });

        // Progress dots
        const dots = document.querySelectorAll('.progress-dot');
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === activeIdx);
        });

        // Scroll indicator
        const scrollInd = document.getElementById('scroll-indicator');
        if (scrollInd) {
            scrollInd.classList.toggle('hidden', window.scrollY > 100);
        }

        // Subtle star twinkling
        renderer.render(scene, camera);
    }

    // ─── Handle Resize ──────────────────────────────────────────
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ─── Initialize ─────────────────────────────────────────────
    buildScrollSections();
    await buildSolarSystem();

    // Set scroll height
    document.getElementById('scroll-container').style.height = `${planets.length * 100}vh`;

    // Initial panel
    setTimeout(() => {
        document.getElementById('panel-0')?.classList.add('visible');
    }, 1200);

    animate();
})().catch(err => {
    console.error('Failed to start the scene:', err);
});
